import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Chats } from '../../Pages/Chats/chats';
import { Error } from '../Error/error';
import { Profile } from '../../Pages/Profile/profile';
import { Home } from '../../Pages/Home/home';
import "./router.css";
import { ChatList } from '../chatList/chatList';
import { useState } from 'react';

const initialChats = [
	{ name: "chat 1", id: "chat1" },
	{ name: "chat 2", id: "chat2" },
	{ name: "chat 3", id: "chat3" },
	{ name: "chat 4", id: "chat4" },
	{ name: "chat 5", id: "chat5" },
];

const initialMessages = initialChats.reduce((acc, chat) => {
	acc[chat.id] = [];
	return acc;
}, {});

export const Router = () => {

	const [chats, setChats] = useState(initialChats);
	const [messages, setMessages] = useState(initialMessages);

	const handleAddMessage = (newMessage, chatId) => {
		setMessages((prevMessages) => ({
			...prevMessages,
			[chatId]: [...prevMessages[chatId], newMessage],
		}));
	};

	return (
		<BrowserRouter>
			<ul className="list">

				<li className="list-item">
					<Link to="/">Home</Link>
				</li >

				<li className="list-item">
					<Link to="/chats">Chats</Link>
				</li>

				<li className="list-item">
					<Link to="/profile">Profile</Link>
				</li>

			</ul>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="chats" element={<ChatList chats={chats} />}>
					<Route
						path=":chatId"
						element={
							<Chats messages={messages} onAddMessage={handleAddMessage} />
						}
					/>
				</Route>
				<Route path="/profile" element={<Profile />} />

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};