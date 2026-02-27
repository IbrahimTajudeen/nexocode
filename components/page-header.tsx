export default function PageHeader({ title, content } : { title: string, content: string }) {
    return (
        <div className="text-center w-full text-white mb-8">
            <div className="flex gap-5 justify-center items-center">
                <span className="inline-block w-10 p-px bg-white"></span>
                    <h1 className="mb-2 font-bold text-3xl xl:text-4xl">{title}</h1>
                <span className="inline-block w-10 p-px bg-white"></span>
            </div>
            <p>{content}</p>
        </div>
    );
}