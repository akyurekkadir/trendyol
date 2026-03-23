import React, { useState } from 'react';
import { Linkedin, Github, Mail, Phone, BookOpen, User, Briefcase, MessageCircle, MapPin } from 'lucide-react';

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState('kadir');

  const contactsList = [
    { id: 'kadir', name: 'Kadir Akyürek', type: 'My Card' },
  ];

  return (
    <div className="flex h-full w-full bg-white text-gray-800 font-sans select-none">
      {/* Left Sidebar - Contacts List */}
      <div className="w-[30%] min-w-[200px] border-r border-gray-200 flex flex-col bg-[#F3F3F3]">
        <div className="h-10 px-4 flex items-center text-xs font-semibold text-gray-500 border-b border-gray-200">
          All Contacts
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contactsList.map(contact => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`px-3 py-1.5 rounded-md text-sm cursor-default flex flex-col
                ${selectedContact === contact.id ? 'bg-[#0063E1] text-white' : 'hover:bg-gray-200 text-gray-800'}`}
            >
              <span className="font-semibold">{contact.name}</span>
              {contact.type && (
                <span className={`text-[10px] ${selectedContact === contact.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {contact.type}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Contact Details */}
      <div className="flex-1 bg-white overflow-y-auto flex justify-center p-8">
        <div className="w-full max-w-lg flex flex-col items-center">

          {/* Header */}
          <div className="w-24 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-4xl font-light mb-4 shadow-inner border border-gray-200">
            KA
          </div>
          <h1 className="text-3xl font-bold mb-1">Kadir Akyürek</h1>
          <p className="text-gray-500 font-medium mb-8">Computer Engineering Student</p>

          <div className="flex gap-4 mb-8 w-full justify-center border-b border-gray-100 pb-8">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors cursor-pointer">
                <MessageCircle size={18} fill="currentColor" />
              </div>
              <span className="text-[10px] text-blue-500 font-medium">Message</span>
            </button>
            <a href="tel:+905362267747" className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors cursor-pointer">
                <Phone size={18} fill="currentColor" />
              </div>
              <span className="text-[10px] text-blue-500 font-medium">Call</span>
            </a>
            <a href="mailto:kadirakyurek353@gmail.com" className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors cursor-pointer">
                <Mail size={18} fill="currentColor" />
              </div>
              <span className="text-[10px] text-blue-500 font-medium">Mail</span>
            </a>
          </div>

          {/* Details Sections */}
          <div className="w-full space-y-6">

            {/* Phone & Email Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-6 text-gray-400 flex justify-center"><Phone size={16} /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">mobile</p>
                  <a href="tel:+905362267747" className="text-blue-500 hover:underline">0536 226 7747</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 text-gray-400 flex justify-center"><Mail size={16} /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">home</p>
                  <a href="mailto:kadirakyurek353@gmail.com" className="text-blue-500 hover:underline">kadirakyurek353@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Socials & Work Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-6 text-[#0077b5] flex justify-center"><Linkedin size={18} fill="currentColor" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">linkedin</p>
                  <a href="https://www.linkedin.com/in/kadir-akyürek-847199246" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">kadir-akyürek-847199246</a>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-6 text-gray-800 flex justify-center"><Github size={18} fill="currentColor" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">github</p>
                  <a href="https://github.com/akyurekkadir" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">@akyurekkadir</a>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-6 text-[#20BEFF] flex justify-center"><BookOpen size={18} fill="currentColor" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">kaggle</p>
                  <a href="https://www.kaggle.com/c0decad0" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">@c0decad0</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 text-yellow-500 flex justify-center"><User size={18} fill="currentColor" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">huggingface</p>
                  <a href="https://huggingface.co/akyurekkadir" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">@akyurekkadir</a>
                </div>
              </div>
            </div>

            {/* Work */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-6 text-gray-400 flex justify-center"><Briefcase size={16} /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">work</p>
                  <p className="text-gray-800">Telenity / DenizBank / TÜBİTAK</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
