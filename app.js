/**
 * Universal Chat Widget Bootstrap Script
 * Production-ready chatbot widget system
 * Version: 1.0.0
 * 
 * Usage: <script src="https://your-domain.com/app.js"></script>
 */

(function() {
    'use strict';

    // Chat Interface HTML Template (will be used in iframe)
    const CHAT_INTERFACE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Chat Widget</title>
    <style>
        /* Inline styles for iframe content */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #1f2937;
        }

        .chat-container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: #ffffff;
        }

        .chat-header {
            background: #4f46e5;
            color: white;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
            flex-shrink: 0;
        }

        .chat-header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .chat-avatar {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chat-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
        }

        .chat-status {
            font-size: 12px;
            opacity: 0.8;
        }

        .close-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .message {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            max-width: 85%;
        }

        .user-message {
            align-self: flex-end;
            flex-direction: row-reverse;
        }

        .bot-message {
            align-self: flex-start;
        }

        .message-avatar {
            width: 28px;
            height: 28px;
            background: #f3f4f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4f46e5;
            flex-shrink: 0;
            margin-top: 4px;
        }

        .message-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .message-text {
            background: #f3f4f6;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .user-message .message-text {
            background: #4f46e5;
            color: white;
        }

        .message-time {
            font-size: 11px;
            color: #6b7280;
            text-align: left;
        }

        .user-message .message-time {
            text-align: right;
        }

        .typing-indicator {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            max-width: 85%;
        }

        .typing-indicator.hidden {
            display: none;
        }

        .typing-dots {
            display: flex;
            gap: 4px;
            padding: 8px 12px;
            background: #f3f4f6;
            border-radius: 12px;
        }

        .typing-dots span {
            width: 6px;
            height: 6px;
            background: #6b7280;
            border-radius: 50%;
            animation: typingDot 1.5s infinite;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
            0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
            30% { opacity: 1; transform: scale(1.2); }
        }

        .input-container {
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            background: #ffffff;
            flex-shrink: 0;
        }

        .input-form {
            display: flex;
            gap: 8px;
            align-items: flex-end;
        }

        .message-input {
            flex: 1;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            padding: 12px 16px;
            font-size: 14px;
            font-family: inherit;
            background: white;
            color: #1f2937;
            outline: none;
        }

        .message-input:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .send-btn {
            background: #4f46e5;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            flex-shrink: 0;
        }

        .send-btn:hover {
            background: #4338ca;
        }

        .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <div class="chat-header-content">
                <div class="chat-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <div>
                    <h3 class="chat-title">Demo Chat</h3>
                    <span class="chat-status">Online</span>
                </div>
            </div>
            <button class="close-btn" id="closeBtn" aria-label="Close chat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
            </button>
        </div>

        <div class="messages-container" id="messagesContainer">
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">Hello! Welcome to our demo chat. Type "hello" to see how I respond!</div>
                    <div class="message-time" id="welcomeTime"></div>
                </div>
            </div>
        </div>

        <div class="typing-indicator hidden" id="typingIndicator">
            <div class="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="input-container">
            <form class="input-form" id="messageForm">
                <input 
                    type="text" 
                    class="message-input" 
                    id="messageInput" 
                    placeholder="Type your message..." 
                    autocomplete="off"
                    maxlength="1000"
                />
                <button type="submit" class="send-btn" id="sendBtn" aria-label="Send message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" fill="currentColor"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>

    <script>
        class ChatWidget {
            constructor() {
                this.messageId = 0;
                this.isTyping = false;
                this.demoResponse = "This is a demo bot, see you soon!";
                this.init();
            }

            init() {
                this.bindEvents();
                this.setWelcomeTime();
                this.focusInput();
                this.notifyParent({ type: 'ready', version: '1.0' });
            }

            bindEvents() {
                const form = document.getElementById('messageForm');
                const closeBtn = document.getElementById('closeBtn');
                const input = document.getElementById('messageInput');

                if (form) {
                    form.addEventListener('submit', (e) => this.handleSubmit(e));
                }
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.handleClose());
                }
                
                if (input) {
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (form) {
                                form.dispatchEvent(new Event('submit'));
                            }
                        }
                    });
                }
            }

            handleSubmit(e) {
                e.preventDefault();
                const input = document.getElementById('messageInput');
                if (!input) return;
                
                const message = input.value.trim();
                
                if (!message || this.isTyping) return;

                this.addUserMessage(message);
                input.value = '';
                this.handleBotResponse(message);
            }

            handleClose() {
                this.notifyParent({ type: 'close' });
            }

            addUserMessage(text) {
                const container = document.getElementById('messagesContainer');
                if (!container) return;
                
                const messageElement = document.createElement('div');
                messageElement.className = 'message user-message';
                messageElement.innerHTML = \`
                    <div class="message-content">
                        <div class="message-text">\${this.escapeHtml(text)}</div>
                        <div class="message-time">\${this.getCurrentTime()}</div>
                    </div>
                \`;
                
                container.appendChild(messageElement);
                this.scrollToBottom();
                this.notifyParent({ type: 'newMessage', isUser: true, text: text });
            }

            async handleBotResponse(userMessage) {
                const shouldRespond = userMessage.toLowerCase().includes('hello');
                
                if (shouldRespond) {
                    await this.showTypingIndicator();
                    await this.delay(1500);
                    this.hideTypingIndicator();
                    this.addBotMessage(this.demoResponse);
                }
            }

            addBotMessage(text) {
                const container = document.getElementById('messagesContainer');
                if (!container) return;
                
                const messageElement = document.createElement('div');
                messageElement.className = 'message bot-message';
                messageElement.innerHTML = \`
                    <div class="message-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="message-content">
                        <div class="message-text">\${this.escapeHtml(text)}</div>
                        <div class="message-time">\${this.getCurrentTime()}</div>
                    </div>
                \`;
                
                container.appendChild(messageElement);
                this.scrollToBottom();
                this.notifyParent({ type: 'newMessage', isUser: false, text: text });
            }

            async showTypingIndicator() {
                this.isTyping = true;
                const indicator = document.getElementById('typingIndicator');
                if (indicator) {
                    indicator.classList.remove('hidden');
                    this.scrollToBottom();
                }
            }

            hideTypingIndicator() {
                this.isTyping = false;
                const indicator = document.getElementById('typingIndicator');
                if (indicator) {
                    indicator.classList.add('hidden');
                }
            }

            scrollToBottom() {
                const container = document.getElementById('messagesContainer');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }

            focusInput() {
                const input = document.getElementById('messageInput');
                if (input) {
                    setTimeout(() => input.focus(), 100);
                }
            }

            setWelcomeTime() {
                const timeElement = document.getElementById('welcomeTime');
                if (timeElement) {
                    timeElement.textContent = this.getCurrentTime();
                }
            }

            getCurrentTime() {
                const now = new Date();
                return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            notifyParent(data) {
                if (window.parent && window.parent !== window) {
                    try {
                        window.parent.postMessage({
                            source: 'chatWidget',
                            ...data
                        }, '*');
                    } catch (error) {
                        console.warn('Failed to notify parent:', error);
                    }
                }
            }
        }

        // Initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => new ChatWidget());
        } else {
            new ChatWidget();
        }

        // Handle messages from parent
        window.addEventListener('message', (event) => {
            if (event.data && event.data.source === 'chatWidgetHost') {
                const { type } = event.data;
                
                switch (type) {
                    case 'focus':
                        const input = document.getElementById('messageInput');
                        if (input) input.focus();
                        break;
                }
            }
        });
    </script>
</body>
</html>`;

    // Widget configuration
    const WIDGET_CONFIG = {
        version: '1.0.0',
        position: 'bottom-right',
        theme: {
            primary: '#4f46e5',
            background: '#ffffff',
            text: '#1f2937'
        },
        zIndex: 999999,
        debug: true
    };

    class UniversalChatWidget {
        constructor() {
            this.isOpen = false;
            this.isReady = false;
            this.unreadCount = 0;
            this.messageQueue = [];
            
            // DOM elements
            this.bubble = null;
            this.iframe = null;
            this.container = null;
            this.unreadBadge = null;

            // Bind methods
            this.handleMessage = this.handleMessage.bind(this);
            this.handleBubbleClick = this.handleBubbleClick.bind(this);
            this.handleEscapeKey = this.handleEscapeKey.bind(this);

            this.init();
        }

        init() {
            if (this.isInitialized()) {
                this.log('Widget already initialized');
                return;
            }

            this.log('Initializing chat widget');
            this.createStyles();
            this.createBubble();
            this.bindEvents();
            this.markAsInitialized();
        }

        isInitialized() {
            return document.querySelector('.chat-widget-bubble') !== null;
        }

        markAsInitialized() {
            document.documentElement.setAttribute('data-chat-widget-initialized', 'true');
        }

        createStyles() {
            if (document.getElementById('chat-widget-styles')) return;

            const styles = document.createElement('style');
            styles.id = 'chat-widget-styles';
            styles.textContent = `
                .chat-widget-bubble {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: ${WIDGET_CONFIG.theme.primary};
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: ${WIDGET_CONFIG.zIndex};
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border: none;
                    outline: none;
                }

                .chat-widget-bubble:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }

                .chat-widget-bubble:active {
                    transform: scale(0.95);
                }

                .chat-widget-bubble:focus-visible {
                    outline: 3px solid rgba(79, 70, 229, 0.4);
                    outline-offset: 2px;
                }

                .chat-widget-bubble svg {
                    width: 24px;
                    height: 24px;
                    color: white;
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .chat-widget-bubble.open svg {
                    transform: rotate(45deg);
                }

                .chat-widget-unread-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    min-width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .chat-widget-container {
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    width: 380px;
                    height: 500px;
                    z-index: ${WIDGET_CONFIG.zIndex - 1};
                    transform: translateX(100%) scale(0.8);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }

                .chat-widget-container.open {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                    pointer-events: auto;
                }

                .chat-widget-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    background: white;
                }

                /* Mobile styles */
                @media (max-width: 480px) {
                    .chat-widget-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        transform: translateY(100%);
                        border-radius: 0;
                    }

                    .chat-widget-container.open {
                        transform: translateY(0);
                    }

                    .chat-widget-iframe {
                        border-radius: 0;
                    }

                    .chat-widget-bubble {
                        bottom: 16px;
                        right: 16px;
                    }
                }
            `;

            document.head.appendChild(styles);
        }

        createBubble() {
            // Create bubble button
            this.bubble = document.createElement('button');
            this.bubble.className = 'chat-widget-bubble';
            this.bubble.setAttribute('aria-label', 'Open chat');
            this.bubble.setAttribute('type', 'button');
            
            this.bubble.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                    <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" fill="currentColor"/>
                </svg>
            `;

            // Create unread badge
            this.unreadBadge = document.createElement('div');
            this.unreadBadge.className = 'chat-widget-unread-badge';
            this.unreadBadge.style.display = 'none';
            this.bubble.appendChild(this.unreadBadge);

            document.body.appendChild(this.bubble);
            this.log('Chat bubble created');
        }

        createIframe() {
            if (this.container) return;

            this.log('Creating iframe container');

            // Create container
            this.container = document.createElement('div');
            this.container.className = 'chat-widget-container';

            // Create iframe with inline content
            this.iframe = document.createElement('iframe');
            this.iframe.className = 'chat-widget-iframe';
            this.iframe.setAttribute('title', 'Chat Widget');
            this.iframe.setAttribute('srcdoc', CHAT_INTERFACE_HTML);

            this.container.appendChild(this.iframe);
            document.body.appendChild(this.container);
            
            this.log('Iframe created with inline content');
        }

        bindEvents() {
            // Bubble click
            this.bubble.addEventListener('click', this.handleBubbleClick);

            // Message handling
            window.addEventListener('message', this.handleMessage);

            // Keyboard navigation
            document.addEventListener('keydown', this.handleEscapeKey);

            this.log('Events bound');
        }

        handleBubbleClick(event) {
            event.preventDefault();
            event.stopPropagation();
            
            this.log('Bubble clicked, isOpen:', this.isOpen);
            
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            if (this.isOpen) return;

            this.log('Opening chat');
            
            // Create iframe if it doesn't exist
            if (!this.container) {
                this.createIframe();
            }

            // Update UI
            this.isOpen = true;
            this.bubble.classList.add('open');
            this.bubble.setAttribute('aria-label', 'Close chat');
            
            // Show container with animation
            requestAnimationFrame(() => {
                this.container.classList.add('open');
            });

            // Clear unread count
            this.setUnreadCount(0);

            // Send focus event to iframe when ready
            if (this.isReady) {
                this.sendToIframe({ type: 'focus' });
            }
        }

        closeChat() {
            if (!this.isOpen) return;

            this.log('Closing chat');
            
            this.isOpen = false;
            this.bubble.classList.remove('open');
            this.bubble.setAttribute('aria-label', 'Open chat');
            
            if (this.container) {
                this.container.classList.remove('open');
            }
        }

        handleMessage(event) {
            const data = event.data;
            if (!data || data.source !== 'chatWidget') return;

            this.log('Received message from iframe:', data);

            switch (data.type) {
                case 'ready':
                    this.handleIframeReady(data);
                    break;
                case 'close':
                    this.closeChat();
                    break;
                case 'newMessage':
                    this.handleNewMessage(data);
                    break;
            }
        }

        handleIframeReady(data) {
            this.isReady = true;
            this.log('Iframe ready, version:', data.version);
            
            // Process any queued messages
            this.processMessageQueue();
            
            // Focus input if chat is open
            if (this.isOpen) {
                this.sendToIframe({ type: 'focus' });
            }
        }

        handleNewMessage(data) {
            // If chat is closed and it's a bot message, show unread indicator
            if (!this.isOpen && !data.isUser) {
                this.incrementUnreadCount();
            }
        }

        setUnreadCount(count) {
            this.unreadCount = Math.max(0, count);
            
            if (this.unreadCount === 0) {
                this.unreadBadge.style.display = 'none';
            } else {
                this.unreadBadge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount.toString();
                this.unreadBadge.style.display = 'flex';
            }
        }

        incrementUnreadCount() {
            this.setUnreadCount(this.unreadCount + 1);
        }

        handleEscapeKey(event) {
            if (event.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        }

        sendToIframe(message) {
            if (!this.iframe || !this.isReady) {
                this.messageQueue.push(message);
                this.log('Queuing message (iframe not ready):', message);
                return;
            }

            try {
                this.iframe.contentWindow.postMessage({
                    source: 'chatWidgetHost',
                    ...message
                }, '*');
                this.log('Sent message to iframe:', message);
            } catch (error) {
                this.log('Error sending message to iframe:', error);
            }
        }

        processMessageQueue() {
            this.log('Processing message queue, length:', this.messageQueue.length);
            while (this.messageQueue.length > 0) {
                const message = this.messageQueue.shift();
                this.sendToIframe(message);
            }
        }

        log(...args) {
            if (WIDGET_CONFIG.debug) {
                console.log('[ChatWidget]', ...args);
            }
        }

        // Public API
        destroy() {
            if (this.bubble) {
                this.bubble.removeEventListener('click', this.handleBubbleClick);
                this.bubble.remove();
            }
            
            if (this.container) {
                this.container.remove();
            }
            
            const styles = document.getElementById('chat-widget-styles');
            if (styles) {
                styles.remove();
            }
            
            window.removeEventListener('message', this.handleMessage);
            document.removeEventListener('keydown', this.handleEscapeKey);
            
            document.documentElement.removeAttribute('data-chat-widget-initialized');
        }

        open() {
            this.openChat();
        }

        close() {
            this.closeChat();
        }

        toggle() {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }
    }

    // Auto-initialize
    function initWidget() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.ChatWidget = new UniversalChatWidget();
            });
        } else {
            window.ChatWidget = new UniversalChatWidget();
        }
    }

    // Initialize the widget
    initWidget();

    // Export for manual access
    window.UniversalChatWidget = UniversalChatWidget;

})();