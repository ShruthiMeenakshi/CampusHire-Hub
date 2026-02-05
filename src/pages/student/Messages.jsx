import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Search,
  Filter,
  User,
  Mail,
  Check,
  CheckCheck,
  Clock,
  Paperclip,
  Image as ImageIcon,
  File,
  Send,
  MoreVertical,
  Trash2,
  Archive,
  Bell,
  Eye,
  EyeOff,
  Reply,
  Forward,
  Star,
  StarOff,
  Download,
  Calendar,
  Phone,
  Video,
  MapPin,
  Users,
  MessageSquare,
  Plus,
  X,
  Smile,
  Mic
} from 'lucide-react';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sample data
  const conversations = [
    {
      id: 1,
      sender: 'Placement Cell',
      senderType: 'placement',
      avatar: 'PC',
      avatarColor: 'from-blue-500 to-blue-700',
      lastMessage: 'Your resume has been shortlisted for Microsoft drive',
      timestamp: '10:30 AM',
      unread: 3,
      isStarred: true,
      tags: ['Important', 'Drive Update']
    },
    {
      id: 2,
      sender: 'Microsoft HR',
      senderType: 'company',
      avatar: 'MS',
      avatarColor: 'from-green-500 to-blue-500',
      lastMessage: 'Interview scheduled for March 20th at 2:00 PM',
      timestamp: 'Yesterday',
      unread: 1,
      isStarred: true,
      tags: ['Interview']
    },
    {
      id: 3,
      sender: 'Google Recruitment',
      senderType: 'company',
      avatar: 'G',
      avatarColor: 'from-red-500 to-yellow-500',
      lastMessage: 'Please complete the pre-assessment by Friday',
      timestamp: '2 days ago',
      unread: 0,
      isStarred: false,
      tags: ['Assessment']
    },
    {
      id: 4,
      sender: 'Amazon Campus Team',
      senderType: 'company',
      avatar: 'A',
      avatarColor: 'from-orange-500 to-yellow-500',
      lastMessage: 'Welcome to the Amazon SDE hiring process',
      timestamp: '3 days ago',
      unread: 0,
      isStarred: false,
      tags: ['Welcome']
    },
    {
      id: 5,
      sender: 'Dr. Sharma (TPO)',
      senderType: 'faculty',
      avatar: 'DS',
      avatarColor: 'from-purple-500 to-pink-500',
      lastMessage: 'Please submit your placement preferences',
      timestamp: '1 week ago',
      unread: 0,
      isStarred: true,
      tags: ['Important']
    },
    {
      id: 6,
      sender: 'Goldman Sachs HR',
      senderType: 'company',
      avatar: 'GS',
      avatarColor: 'from-blue-600 to-black',
      lastMessage: 'Congratulations on passing the first round!',
      timestamp: '1 week ago',
      unread: 0,
      isStarred: false,
      tags: ['Congratulations']
    },
    {
      id: 7,
      sender: 'Infosys Recruitment',
      senderType: 'company',
      avatar: 'I',
      avatarColor: 'from-purple-400 to-blue-400',
      lastMessage: 'Document verification scheduled',
      timestamp: '2 weeks ago',
      unread: 0,
      isStarred: false,
      tags: ['Verification']
    },
    {
      id: 8,
      sender: 'Placement Announcements',
      senderType: 'placement',
      avatar: 'PA',
      avatarColor: 'from-green-600 to-emerald-500',
      lastMessage: 'New drive: Adobe - Product Designer role',
      timestamp: '2 weeks ago',
      unread: 0,
      isStarred: false,
      tags: ['New Drive']
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: 'Placement Cell',
        text: 'Hello John, your resume has been shortlisted for the Microsoft Software Engineer role.',
        timestamp: '9:45 AM',
        isOwn: false,
        status: 'read',
        attachments: []
      },
      {
        id: 2,
        sender: 'You',
        text: 'Thank you! What is the next step in the process?',
        timestamp: '9:47 AM',
        isOwn: true,
        status: 'read',
        attachments: []
      },
      {
        id: 3,
        sender: 'Placement Cell',
        text: 'You need to complete the online assessment by March 15th. The link will be sent to your email.',
        timestamp: '9:50 AM',
        isOwn: false,
        status: 'read',
        attachments: [
          { type: 'file', name: 'assessment_guidelines.pdf', size: '2.4 MB' }
        ]
      },
      {
        id: 4,
        sender: 'Placement Cell',
        text: 'Also, please make sure your resume is updated with your latest project details.',
        timestamp: '10:30 AM',
        isOwn: false,
        status: 'unread',
        attachments: []
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Microsoft HR',
        text: 'Hi John, congratulations on passing the online assessment!',
        timestamp: 'Yesterday, 2:30 PM',
        isOwn: false,
        status: 'read',
        attachments: []
      },
      {
        id: 2,
        sender: 'Microsoft HR',
        text: 'We would like to schedule your technical interview for March 20th at 2:00 PM IST.',
        timestamp: 'Yesterday, 2:31 PM',
        isOwn: false,
        status: 'read',
        attachments: [
          { type: 'calendar', name: 'Interview Invite', details: 'Microsoft Teams Meeting' }
        ]
      },
      {
        id: 3,
        sender: 'You',
        text: 'Thank you! March 20th at 2:00 PM works for me.',
        timestamp: 'Yesterday, 3:15 PM',
        isOwn: true,
        status: 'read',
        attachments: []
      },
      {
        id: 4,
        sender: 'Microsoft HR',
        text: 'Great! The meeting link and interview details will be sent 24 hours before the interview.',
        timestamp: 'Yesterday, 4:00 PM',
        isOwn: false,
        status: 'unread',
        attachments: []
      }
    ]
  };

  const tabs = [
    { id: 'all', label: 'All Messages', count: conversations.length },
    { id: 'unread', label: 'Unread', count: conversations.filter(c => c.unread > 0).length },
    { id: 'starred', label: 'Starred', count: conversations.filter(c => c.isStarred).length },
    { id: 'placement', label: 'Placement Cell', count: conversations.filter(c => c.senderType === 'placement').length },
    { id: 'company', label: 'Companies', count: conversations.filter(c => c.senderType === 'company').length }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return conv.unread > 0;
    if (activeTab === 'starred') return conv.isStarred;
    if (activeTab === 'placement') return conv.senderType === 'placement';
    if (activeTab === 'company') return conv.senderType === 'company';
    return true;
  }).filter(conv =>
    conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sent',
      attachments: []
    };

    setMessageInput('');
  };

  const renderMessageBubble = (message) => (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-3 ${message.isOwn
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}>
          <div className="mb-1">
            {!message.isOwn && (
              <span className="text-xs font-medium text-gray-600">{message.sender}</span>
            )}
          </div>
          <p className="text-sm">{message.text}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${message.isOwn
                    ? 'bg-blue-500 border border-blue-400'
                    : 'bg-white border border-gray-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    {attachment.type === 'file' && <File className="w-4 h-4" />}
                    {attachment.type === 'image' && <ImageIcon className="w-4 h-4" />}
                    {attachment.type === 'calendar' && <Calendar className="w-4 h-4" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{attachment.name}</p>
                      {attachment.size && (
                        <p className="text-xs opacity-80">{attachment.size}</p>
                      )}
                      {attachment.details && (
                        <p className="text-xs opacity-80">{attachment.details}</p>
                      )}
                    </div>
                    <button className="p-1 hover:opacity-80">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${message.isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
              {message.timestamp}
            </span>
            {message.isOwn && (
              <span className="ml-2">
                {message.status === 'sent' && <Check className="w-3 h-3" />}
                {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-300" />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderConversationList = () => (
    <div className={`${isMobileView && selectedConversation ? 'hidden' : 'block'} lg:block`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-6 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg mr-2 ${activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span className="font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-700'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="overflow-y-auto h-[calc(100vh-280px)]">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${selectedConversation === conv.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${conv.avatarColor} flex items-center justify-center text-white font-bold`}>
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{conv.sender}</h3>
                      {conv.senderType === 'placement' && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Placement
                        </span>
                      )}
                      {conv.senderType === 'company' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Company
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle star
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {conv.isStarred ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {conv.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {conv.unread > 0 && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderMessageView = () => {
    if (!selectedConversation) {
      return (
        <div className="hidden lg:flex flex-col items-center justify-center h-full p-8">
          <MessageSquare className="w-24 h-24 text-gray-200 mb-6" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a conversation</h3>
          <p className="text-gray-400 text-center">Choose a message from the list to start chatting</p>
        </div>
      );
    }

    const conversation = conversations.find(c => c.id === selectedConversation);
    const conversationMessages = messages[selectedConversation] || [];

    return (
      <div className={`${isMobileView && selectedConversation ? 'block' : 'hidden'} lg:block`}>
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${conversation.avatarColor} flex items-center justify-center text-white font-bold`}>
                {conversation.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{conversation.sender}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {conversation.senderType === 'company' ? 'Company HR' :
                     conversation.senderType === 'placement' ? 'Placement Cell' : 'Faculty'}
                  </span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Active now
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Voice Call">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Video Call">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="More options">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 h-[calc(100vh-280px)]">
          <div className="max-w-3xl mx-auto">
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6">
              <div className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm text-gray-500">
                Today
              </div>
            </div>

            {/* Messages */}
            {conversationMessages.map(message => renderMessageBubble(message))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`p-3 rounded-xl ${messageInput.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-400'
                  }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-500">
                Press Enter to send • Shift + Enter for new line
              </p>
              <div className="flex items-center gap-4">
                <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <Forward className="w-3 h-3" />
                  Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <StudentLayout activePage="messages" pageTitle="Messages">
      {/* Stats Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">
              Connect with placement cell and companies.
              <span className="font-medium text-blue-600"> {conversations.filter(c => c.unread > 0).length} unread messages</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" />
              New Group
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex h-[calc(100vh-240px)]">
          {/* Left Sidebar - Conversation List */}
          <div className="w-full lg:w-96 border-r border-gray-200">
            {renderConversationList()}
          </div>

          {/* Right Side - Message View */}
          <div className="flex-1 flex flex-col">
            {renderMessageView()}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active conversations: 3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Unread: {conversations.filter(c => c.unread > 0).length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Archive className="w-4 h-4" />
              Archive all read
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Empty trash
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Messages;