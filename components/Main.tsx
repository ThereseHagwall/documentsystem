export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-full min-h-[calc(100vh-6rem)] bg-gray-900 flex justify-center ">
            <div className=" w-full max-w-screen-lg bg-slate-600 flex justify-center">
                {children}
            </div>
        </main>
    );
}
