import Topbar from "@/components/ui/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};
const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
    
  }, [selectedUser, fetchMessages]);
  return (
    <div>
      <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
        <Topbar />

        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
          <UsersList />

          {/* Giao diện - Đoạn chat */}
          <div>
            {selectedUser ? (
              <>
                <ChatHeader />

                {/* Đoạn chat */}
                <ScrollArea className="h-[calc(100vh-340px)]">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-start gap-3 ${
                          message.id_NguoiGui === user?.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.id_NguoiGui === user?.id
                                ? user.imageUrl
                                : selectedUser.imageUrl
                            }
                          />
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 max-w-[70%]
													${message.id_NguoiGui === user?.id ? "bg-green-500" : "bg-zinc-800"}
												`}
                        >
                          <p className="text-sm">{message.noiDung}</p>
                          <span className='text-xs text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Thanh input nhập tin nhắn */}
                <MessageInput/>
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/logo.png" alt="Chill Nhac" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        Chưa chọn cuộc trò chuyện nào
      </h3>
      <p className="text-zinc-500 text-sm">
        {" "}
        Hãy chọn một người bạn để bắt đầu trò chuyện.
      </p>
    </div>
  </div>
);
