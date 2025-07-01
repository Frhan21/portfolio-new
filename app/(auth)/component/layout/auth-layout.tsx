import { FC, ReactNode } from "react"

interface AuthLayoutProps {
    title: string,
    children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#111827] p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#FE7743]">{title}</h1>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-2 transition-colors duration-300">Welcome! Please enter your details.</p>
                </div>
                <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-8 rounded-2xl shadow-lg w-full transition-colors duration-300">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout; 