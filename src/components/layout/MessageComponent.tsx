
interface MessageComponentProps {
    content: string;
    is_bot: boolean;
    username: string;
}


function MessageComponent({ content, is_bot, username }: MessageComponentProps) {
    
    const messageClass = is_bot ? "bg-[#19214A] text-white w-fit max-w-md p-4 rounded-xl gap-2 flex flex-col min-w-[400px]" : "bg-[#2D2F39] text-white w-fit max-w-md self-end p-4 rounded-xl gap-2 flex flex-col min-w-[400px]";

    return (
        <div className={messageClass}>
            <div className="text-xl font-bold  text-white">
                {is_bot ? `Bot: Chapi` : `You: ${username}`}
            </div>
            <div className="border-b-2"></div>
            <p className="">{content}</p>
        </div>
    );

}

export default MessageComponent;