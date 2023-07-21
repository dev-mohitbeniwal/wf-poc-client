import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        if (credentials?.username && credentials?.password) {
          const params = new URLSearchParams();
          params.append("username", credentials.username);
          params.append("password", credentials.password);
          const config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };

          const response = await axios.post(
            `${BACKEND_URL}/user/token`,
            params,
            config
          );

          console.log("Sign in Response: ", response);

          if (response.data?.jwt) {
            Cookies.set("jwt", response.data.jwt);
            return response.data;
          }

          return null;
        }
      },
    }),
  ],

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       return token;
//     },

//     async session({ session, token, user }) {
//       session.user = token;
//       return session;
//     },
//   },
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
};
