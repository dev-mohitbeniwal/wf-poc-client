export default function Card({children}) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 m-4 bg-white">
            {children}
        </div>
    )
}