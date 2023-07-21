import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL: string = "http://localhost:8000/api";

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

          let access_token: string;

          try {
              const response = await axios.post(
                `${BACKEND_URL}/user/token`,
                params,
                config
              );

              access_token = response.data?.access_token;
              
              if (!access_token) {
                return null;
              }

          } catch(error) {
            console.error("Error in axios.post: ", error);
          }

          console.log("Sign in Response: ", access_token);

          if (access_token) {
            Cookies.set("jwt", access_token);
            return {jwt: access_token};
          }

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
};
