import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SparklesIcon, ChatBubbleIcon, CloseIcon } from './components/IconComponents';
import { GoogleGenAI, Chat } from '@google/genai';

// --- Header Component ---
const Header: React.FC = () => (
  <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-slate-700">
    <div className="container mx-auto flex items-center justify-between p-4 text-white">
      <div className="flex items-center gap-3">
        <SparklesIcon className="h-8 w-8 text-blue-400" />
        <span className="text-2xl font-bold tracking-tight">Tech Insights</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <a href="#" className="hover:text-white transition-colors">Trang chủ</a>
        <a href="#" className="hover:text-white transition-colors">Tin tức</a>
        <a href="#" className="hover:text-white transition-colors">Đánh giá</a>
        <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
      </nav>
    </div>
  </header>
);

// --- Main Content Component ---
const MainContent: React.FC = () => {
    const articles = [
        {
            title: "Tương lai của AI: Các mô hình ngôn ngữ lớn sẽ thay đổi thế giới ra sao?",
            excerpt: "Từ việc tự động hóa các tác vụ phức tạp đến việc tạo ra các dạng nghệ thuật mới, các mô hình ngôn ngữ lớn đang định hình lại cách chúng ta làm việc và sáng tạo.",
            category: "Trí tuệ nhân tạo",
            imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Đánh giá chip M-series mới nhất: Hiệu năng vượt trội",
            excerpt: "Thế hệ chip xử lý mới mang lại một bước nhảy vọt về hiệu năng và hiệu quả năng lượng, củng cố vị thế dẫn đầu trong ngành công nghiệp bán dẫn.",
            category: "Phần cứng",
            imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6e74e14a8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "React 19: Những tính năng đáng mong chờ nhất",
            excerpt: "Với sự ra mắt của React Compiler và các cải tiến về Actions, phiên bản mới nhất của thư viện giao diện người dùng phổ biến nhất hứa hẹn sẽ thay đổi cuộc chơi.",
            category: "Phát triển Web",
            imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Điện toán lượng tử: Cuộc cách mạng máy tính tiếp theo",
            excerpt: "Khám phá cách các máy tính lượng tử có khả năng giải quyết các vấn đề mà máy tính cổ điển không thể, mở ra những chân trời mới cho khoa học và công nghệ.",
            category: "Khoa học máy tính",
            imageUrl: "https://images.unsplash.com/photo-1617851099220-a91591f2df6b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Xu hướng an ninh mạng năm 2024 bạn cần biết",
            excerpt: "Các mối đe dọa ngày càng tinh vi đòi hỏi các giải pháp bảo mật tiên tiến. Cùng tìm hiểu về các xu hướng an ninh mạng chính trong năm nay để bảo vệ dữ liệu của bạn.",
            category: "An ninh mạng",
            imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Sự trỗi dậy của kiến trúc Serverless",
            excerpt: "Kiến trúc không máy chủ (Serverless) đang giúp các nhà phát triển xây dựng và triển khai ứng dụng nhanh hơn mà không cần lo lắng về việc quản lý cơ sở hạ tầng.",
            category: "Điện toán đám mây",
            imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-white mb-8 border-b-2 border-blue-500 pb-2">Bài viết nổi bật</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <div key={index} className="bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                        <img className="w-full h-48 object-cover" src={article.imageUrl} alt={article.title} />
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-semibold text-blue-400 uppercase">{article.category}</span>
                            <h2 className="mt-2 mb-3 text-xl font-bold text-white flex-grow">{article.title}</h2>
                            <p className="text-slate-400 text-sm">{article.excerpt}</p>
                        </div>
                         <div className="px-6 pb-4 mt-auto">
                             <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold text-sm inline-block">Đọc thêm &rarr;</a>
                         </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

// --- Footer Component ---
const Footer: React.FC = () => (
  <footer className="bg-slate-900 mt-12 border-t border-slate-700">
    <div className="container mx-auto p-6 text-center text-slate-400 text-sm">
      <p>&copy; {new Date().getFullYear()} Tech Insights. Mọi quyền được bảo lưu.</p>
      <p className="mt-2">Một sản phẩm được thiết kế với sự hỗ trợ của Trợ lý AI.</p>
    </div>
  </footer>
);


// --- Chat Widget Component ---
const ChatWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not set in environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: 'You are a helpful tech assistant speaking Vietnamese.' },
      });
      setChat(chatInstance);
      setMessages([{ id: 'init', text: 'Chào bạn, tôi là trợ lý công nghệ. Bạn cần giúp gì?', sender: MessageSender.AI }]);
    } catch (e) {
      console.error(e);
      setError('Lỗi khởi tạo AI. Vui lòng kiểm tra API key.');
    }
  }, []);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!chat || isLoading) return;
    setIsLoading(true);
    setError(null);
    const userMessage: ChatMessageType = { id: `user-${Date.now()}`, text: messageText, sender: MessageSender.USER };
    const aiLoadingMessage: ChatMessageType = { id: `ai-${Date.now()}`, text: '', sender: MessageSender.AI, isLoading: true };
    setMessages(prev => [...prev, userMessage, aiLoadingMessage]);
    
    try {
        const result = await chat.sendMessageStream({ message: messageText });
        let fullResponse = "";
        for await (const chunk of result) {
            fullResponse += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === aiLoadingMessage.id ? { ...msg, text: fullResponse } : msg));
        }
        setMessages(prev => prev.map(msg => msg.id === aiLoadingMessage.id ? { ...msg, isLoading: false } : msg));
    } catch (e) {
        console.error(e);
        const errorText = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        setError(errorText);
        setMessages(prev => prev.slice(0, -1).concat([{ id: `err-${Date.now()}`, text: errorText, sender: MessageSender.AI }]));
    } finally {
        setIsLoading(false);
    }
  }, [chat, isLoading]);

  return (
      <div className={`fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-sm h-[60vh] max-h-[500px] flex flex-col bg-slate-800 rounded-xl shadow-2xl border border-slate-700 transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <header className="flex items-center justify-between p-3 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700 rounded-t-xl shrink-0">
            <h3 className="text-md font-bold text-white">Trợ lý AI</h3>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white transition-colors" aria-label="Đóng chat">
              <CloseIcon />
            </button>
          </header>
          
          <main ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
              {error && <div className="text-center text-red-400 text-sm p-2 bg-red-500/10 rounded-md">{error}</div>}
          </main>

          <div className="shrink-0">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
      </div>
  );
};


// --- App Layout ---
const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-800">
      <Header />
      <MainContent />
      <Footer />

      {/* Chat Bubble & Widget */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-slate-800 focus:ring-blue-500 transform transition-transform hover:scale-110"
            aria-label={isChatOpen ? "Đóng chat" : "Mở chat"}
          >
             <ChatBubbleIcon />
          </button>
      </div>
      
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
