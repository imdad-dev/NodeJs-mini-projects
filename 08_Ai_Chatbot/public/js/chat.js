// ── Only run if we are inside a conversation ────────────
if (typeof CONVERSATION_ID !== 'undefined') {

  const chatForm       = document.getElementById('chatForm');
  const messageInput   = document.getElementById('messageInput');
  const messagesContainer = document.getElementById('messagesContainer');
  const sendBtn        = document.getElementById('sendBtn');
  const sendBtnText    = document.getElementById('sendBtnText');
  const typingIndicator = document.getElementById('typingIndicator');
  const chatTitle      = document.getElementById('chatTitle');

  // ── Auto scroll to bottom ─────────────────────────────
  const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // ── Format current time ───────────────────────────────
  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ── Create message bubble HTML ────────────────────────
  const createMessageEl = (role, content, time) => {
    const msg = document.createElement('div');
    msg.classList.add('message', role);
    msg.innerHTML = `
      <div class="message-avatar">${role === 'user' ? '👤' : '🤖'}</div>
      <div class="message-bubble">
        <div class="message-role">${role === 'user' ? 'You' : 'AI Assistant'}</div>
        <div class="message-content">${content.replace(/\n/g, '<br/>')}</div>
        <div class="message-time">${time}</div>
      </div>
    `;
    return msg;
  };

  // ── Show typing indicator ─────────────────────────────
  const showTyping = () => {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
  };

  // ── Hide typing indicator ─────────────────────────────
  const hideTyping = () => {
    typingIndicator.style.display = 'none';
  };

  // ── Disable / Enable send button ─────────────────────
  const setSending = (isSending) => {
    sendBtn.disabled = isSending;
    sendBtnText.textContent = isSending ? '...' : 'Send ↑';
    messageInput.disabled = isSending;
  };

  // ── Auto resize textarea height ───────────────────────
  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
  });

  // ── Enter to send, Shift+Enter for new line ───────────
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  // ── Send message ──────────────────────────────────────
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Show user message immediately
    const userEl = createMessageEl('user', message, getTime());
    messagesContainer.insertBefore(userEl, typingIndicator);
    scrollToBottom();

    // Show typing indicator + disable input
    showTyping();
    setSending(true);

    try {
      const res = await fetch(`/chat/${CONVERSATION_ID}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.success) {
        // Update sidebar title if first message
        if (chatTitle) chatTitle.textContent = data.conversationTitle;

        // Show AI reply
        const aiEl = createMessageEl('assistant', data.aiReply, getTime());
        messagesContainer.insertBefore(aiEl, typingIndicator);

        // Update sidebar conversation title
        const sidebarTitle = document.querySelector(
          `.conversation-item[data-id="${CONVERSATION_ID}"] .conversation-title`
        );
        if (sidebarTitle) sidebarTitle.textContent = data.conversationTitle;

      } else {
        const errEl = createMessageEl('assistant', '⚠️ Something went wrong. Please try again.', getTime());
        messagesContainer.insertBefore(errEl, typingIndicator);
      }

    } catch (err) {
      console.error('Fetch error:', err);
      const errEl = createMessageEl('assistant', '⚠️ Network error. Please check your connection.', getTime());
      messagesContainer.insertBefore(errEl, typingIndicator);
    } finally {
      hideTyping();
      setSending(false);
      scrollToBottom();
      messageInput.focus();
    }
  });

  // ── Delete conversation ───────────────────────────────
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = btn.dataset.id;
      const confirmed = confirm('Delete this conversation?');
      if (!confirmed) return;

      try {
        const res = await fetch(`/chat/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
          // Remove from sidebar
          const item = document.querySelector(`.conversation-item[data-id="${id}"]`);
          if (item) item.remove();

          // Redirect if deleted active conversation
          if (id === CONVERSATION_ID) window.location.href = '/chat';
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    });
  });

  // ── Scroll to bottom on page load ─────────────────────
  scrollToBottom();
  messageInput.focus();
}

// ── Search / Filter Conversations ─────────────────────
const searchInput = document.getElementById('searchInput');
const noResults   = document.getElementById('noResults');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll('.conversation-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const title = item.querySelector('.conversation-title').textContent.toLowerCase();
      const match = title.includes(query);
      item.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    // Show no results message if nothing matches
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
}


// ── Rename Conversation ────────────────────────────────
const makeRenameInput = (el, conversationId, isChatTitle = false) => {
  const currentTitle = el.textContent.trim();

  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.classList.add('rename-input');
  if (isChatTitle) input.classList.add('chat-title');

  // Replace element with input
  el.replaceWith(input);
  input.focus();
  input.select();

  // ── Save on Enter ──────────────────────────────────
  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') await saveRename(input, el, conversationId);
    if (e.key === 'Escape') cancelRename(input, el);
  });

  // ── Save on blur (click away) ──────────────────────
  input.addEventListener('blur', async () => {
    await saveRename(input, el, conversationId);
  });
};

const saveRename = async (input, originalEl, conversationId) => {
  const newTitle = input.value.trim();

  // If empty or unchanged just cancel
  if (!newTitle || newTitle === originalEl.textContent.trim()) {
    cancelRename(input, originalEl);
    return;
  }

  try {
    const res = await fetch(`/chat/${conversationId}/rename`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });

    const data = await res.json();

    if (data.success) {
      // Update element text
      originalEl.textContent = data.title;
      input.replaceWith(originalEl);

      // Sync sidebar title if renamed from chat header
      const sidebarTitle = document.querySelector(
        `.conversation-title[data-id="${conversationId}"]`
      );
      if (sidebarTitle) sidebarTitle.textContent = data.title;

      // Sync chat header if renamed from sidebar
      const chatTitle = document.getElementById('chatTitle');
      if (chatTitle && chatTitle.dataset.id === conversationId) {
        chatTitle.textContent = data.title;
      }

    } else {
      cancelRename(input, originalEl);
    }
  } catch (err) {
    console.error('Rename error:', err);
    cancelRename(input, originalEl);
  }
};

const cancelRename = (input, originalEl) => {
  input.replaceWith(originalEl);
};

// ── Double click sidebar title to rename ───────────────
document.querySelectorAll('.conversation-title[data-id]').forEach((el) => {
  el.addEventListener('dblclick', (e) => {
    e.preventDefault();
    e.stopPropagation();
    makeRenameInput(el, el.dataset.id, false);
  });
});

// ── Double click chat header title to rename ───────────
const chatTitleEl = document.getElementById('chatTitle');
if (chatTitleEl && chatTitleEl.dataset.id) {
  chatTitleEl.addEventListener('dblclick', () => {
    makeRenameInput(chatTitleEl, chatTitleEl.dataset.id, true);
  });
}