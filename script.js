// ====== APP STATE & CONFIGURATION ======
const APP_CONFIG = {
    appName: 'SociVerse',
    version: '1.0.0',
    apiEndpoint: 'https://api.sociverse.com/v1',
    isOnline: true,
    demoMode: true,
    currentUser: null,
    posts: [],
    friends: [],
    notifications: [],
    messages: []
};

// ====== MOCK DATABASE ======
const MOCK_DATABASE = {
    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@demo.com',
            password: 'demo123',
            profilePic: 'https://i.pravatar.cc/100?img=1',
            bio: 'Digital Creator | Tech Enthusiast',
            location: 'Dhaka, Bangladesh',
            friends: [2, 3, 4],
            online: true
        },
        {
            id: 2,
            name: 'Sarah Smith',
            email: 'sarah@demo.com',
            profilePic: 'https://i.pravatar.cc/100?img=5',
            bio: 'Photographer | Travel Blogger',
            online: true
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@demo.com',
            profilePic: 'https://i.pravatar.cc/100?img=6',
            bio: 'Software Engineer',
            online: false
        },
        {
            id: 4,
            name: 'Emma Wilson',
            email: 'emma@demo.com',
            profilePic: 'https://i.pravatar.cc/100?img=8',
            bio: 'Graphic Designer',
            online: true
        }
    ],
    
    posts: [
        {
            id: 1,
            userId: 1,
            content: 'Just launched SociVerse! Excited to connect with everyone in this new social universe! 🌐 #SocialMedia #NewBeginning',
            image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            likes: [2, 3, 4],
            comments: [
                { userId: 2, text: 'Congratulations! Looking great!' },
                { userId: 3, text: 'Awesome work!' }
            ],
            shares: 5,
            createdAt: '2024-01-15T10:30:00'
        },
        {
            id: 2,
            userId: 2,
            content: 'Beautiful sunset at the beach today! 🌅 Nature always finds a way to amaze me. #Sunset #Beach #Nature',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            likes: [1, 4],
            comments: [
                { userId: 1, text: 'Stunning view!' }
            ],
            shares: 2,
            createdAt: '2024-01-14T18:45:00'
        },
        {
            id: 3,
            userId: 3,
            content: 'Just completed my new project! Learning JavaScript has been an amazing journey. #Programming #JavaScript #WebDev',
            likes: [1, 2],
            comments: [],
            shares: 1,
            createdAt: '2024-01-13T14:20:00'
        }
    ],
    
    notifications: [
        { id: 1, type: 'friend_request', fromUserId: 2, message: 'sent you a friend request', time: '2 min ago' },
        { id: 2, type: 'like', fromUserId: 3, message: 'liked your post', time: '1 hour ago' },
        { id: 3, type: 'comment', fromUserId: 4, message: 'commented on your post', time: '3 hours ago' },
        { id: 4, type: 'message', fromUserId: 2, message: 'sent you a message', time: '5 hours ago' }
    ],
    
    messages: [
        { id: 1, from: 2, to: 1, text: 'Hey! How are you doing?', time: '10:30 AM' },
        { id: 2, from: 1, to: 2, text: 'I\'m good! Working on SociVerse.', time: '10:32 AM' },
        { id: 3, from: 2, to: 1, text: 'That\'s awesome! Can\'t wait to try it.', time: '10:33 AM' }
    ]
};

// ====== DOM ELEMENTS ======
let domElements = {};

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    console.log(`${APP_CONFIG.appName} v${APP_CONFIG.version} initializing...`);
    
    cacheDOMElements();
    initializeApp();
    
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            showAuthScreen();
        }, 500);
    }, 2000);
});

function cacheDOMElements() {
    domElements = {
        loadingScreen: document.getElementById('loadingScreen'),
        authContainer: document.getElementById('authContainer'),
        appContainer: document.getElementById('appContainer'),
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        userName: document.getElementById('userName'),
        userProfilePic: document.getElementById('userProfilePic'),
        mainUserName: document.getElementById('mainUserName'),
        mainProfilePic: document.getElementById('mainProfilePic'),
        userEmail: document.getElementById('userEmail'),
        friendCount: document.getElementById('friendCount'),
        postCount: document.getElementById('postCount'),
        postsContainer: document.getElementById('postsContainer'),
        onlineFriendsList: document.getElementById('onlineFriendsList'),
        friendRequestsList: document.getElementById('friendRequestsList'),
        notificationsList: document.getElementById('notificationsList'),
        messageBadge: document.getElementById('messageBadge'),
        notificationBadge: document.getElementById('notificationBadge'),
        profileDropdown: document.getElementById('profileDropdown'),
        mediaUploadModal: document.getElementById('mediaUploadModal'),
        quickPostModal: document.getElementById('quickPostModal'),
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toastMessage')
    };
}

// ====== AUTHENTICATION FUNCTIONS ======
function showAuthScreen() {
    domElements.authContainer.style.display = 'flex';
    showLogin();
}

function showLogin() {
    domElements.loginForm.classList.add('active');
    domElements.registerForm.classList.remove('active');
}

function showRegister() {
    domElements.loginForm.classList.remove('active');
    domElements.registerForm.classList.add('active');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function fillDemoCredentials() {
    document.getElementById('loginEmail').value = 'john@demo.com';
    document.getElementById('loginPassword').value = 'demo123';
    showToast('Demo credentials filled! Click Login to continue.');
}

function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        showToast('Please fill in all fields!', 'error');
        return;
    }
    
    // Mock authentication
    const user = MOCK_DATABASE.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        APP_CONFIG.currentUser = user;
        startApp();
        showToast('Login successful! Welcome to SociVerse.');
    } else {
        showToast('Invalid email or password!', 'error');
    }
}

function register() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields!', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters!', 'error');
        return;
    }
    
    // Mock registration
    const newUser = {
        id: MOCK_DATABASE.users.length + 1,
        name,
        email,
        password,
        profilePic: `https://i.pravatar.cc/100?img=${MOCK_DATABASE.users.length + 10}`,
        bio: 'New SociVerse user',
        friends: [],
        online: true
    };
    
    MOCK_DATABASE.users.push(newUser);
    APP_CONFIG.currentUser = newUser;
    
    startApp();
    showToast('Registration successful! Welcome to SociVerse.');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        APP_CONFIG.currentUser = null;
        domElements.appContainer.style.display = 'none';
        domElements.authContainer.style.display = 'flex';
        showLogin();
        showToast('Logged out successfully.');
    }
}

// ====== APP FUNCTIONS ======
function startApp() {
    domElements.authContainer.style.display = 'none';
    domElements.appContainer.style.display = 'block';
    
    updateUserProfile();
    loadPosts();
    loadOnlineFriends();
    loadFriendRequests();
    loadNotifications();
    updateBadges();
    
    // Initialize sections
    showSection('feed');
}

function updateUserProfile() {
    if (!APP_CONFIG.currentUser) return;
    
    const user = APP_CONFIG.currentUser;
    
    // Update all profile elements
    domElements.userName.textContent = user.name;
    domElements.mainUserName.textContent = user.name;
    domElements.userEmail.textContent = user.email;
    
    const profilePic = user.profilePic || 'https://i.pravatar.cc/100';
    domElements.userProfilePic.src = profilePic;
    domElements.mainProfilePic.src = profilePic;
    
    // Update stats
    domElements.friendCount.textContent = user.friends ? user.friends.length : 0;
    domElements.postCount.textContent = MOCK_DATABASE.posts.filter(p => p.userId === user.id).length;
}

function showSection(sectionId) {
    // Hide all sections
    const sections = ['feed', 'friends', 'messages', 'notifications', 'profile', 'settings'];
    sections.forEach(section => {
        const element = document.getElementById(`${section}Section`);
        if (element) element.style.display = 'none';
    });
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const sectionElement = document.getElementById(`${sectionId}Section`);
    if (sectionElement) {
        sectionElement.style.display = 'block';
        
        // Update active nav link if exists
        const navLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (navLink) navLink.classList.add('active');
    }
    
    // Load section-specific content
    switch(sectionId) {
        case 'friends':
            loadFriendsGrid();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'notifications':
            loadNotifications();
            break;
        case 'profile':
            loadProfilePosts();
            break;
    }
}

// ====== POSTS FUNCTIONS ======
function loadPosts() {
    const postsContainer = domElements.postsContainer;
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    MOCK_DATABASE.posts.forEach(post => {
        const user = MOCK_DATABASE.users.find(u => u.id === post.userId);
        if (!user) return;
        
        const postElement = createPostElement(post, user);
        postsContainer.appendChild(postElement);
    });
}

function createPostElement(post, user) {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <div class="post-header">
            <img src="${user.profilePic}" alt="${user.name}">
            <div class="post-user-info">
                <h4>${user.name}</h4>
                <div class="post-time">${formatTime(post.createdAt)}</div>
            </div>
        </div>
        <div class="post-content">
            ${post.content}
        </div>
        ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        <div class="post-stats">
            <span>${post.likes.length} likes</span>
            <span> • </span>
            <span>${post.comments.length} comments</span>
            <span> • </span>
            <span>${post.shares || 0} shares</span>
        </div>
        <div class="post-actions">
            <button class="action-btn ${post.likes.includes(APP_CONFIG.currentUser?.id) ? 'liked' : ''}" 
                    onclick="toggleLike(${post.id})">
                <i class="fas fa-thumbs-up"></i>
                <span>Like</span>
            </button>
            <button class="action-btn" onclick="focusComment(${post.id})">
                <i class="fas fa-comment"></i>
                <span>Comment</span>
            </button>
            <button class="action-btn" onclick="sharePost(${post.id})">
                <i class="fas fa-share"></i>
                <span>Share</span>
            </button>
        </div>
        <div class="post-comments" id="comments-${post.id}">
            ${post.comments.slice(0, 2).map(comment => {
                const commentUser = MOCK_DATABASE.users.find(u => u.id === comment.userId);
                return commentUser ? `
                    <div class="comment">
                        <img src="${commentUser.profilePic}" alt="${commentUser.name}">
                        <div>
                            <strong>${commentUser.name}</strong>
                            <p>${comment.text}</p>
                        </div>
                    </div>
                ` : '';
            }).join('')}
            ${post.comments.length > 2 ? 
                `<button class="view-comments" onclick="viewAllComments(${post.id})">
                    View all ${post.comments.length} comments
                </button>` : ''
            }
            <div class="add-comment">
                <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}">
                <button onclick="addComment(${post.id})"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    return div;
}

function createNewPost() {
    const postText = document.getElementById('postText').value.trim();
    if (!postText) {
        showToast('Please write something to post!', 'error');
        return;
    }
    
    const newPost = {
        id: MOCK_DATABASE.posts.length + 1,
        userId: APP_CONFIG.currentUser.id,
        content: postText,
        image: '',
        likes: [],
        comments: [],
        shares: 0,
        createdAt: new Date().toISOString()
    };
    
    MOCK_DATABASE.posts.unshift(newPost);
    document.getElementById('postText').value = '';
    
    loadPosts();
    updateUserProfile();
    showToast('Post created successfully!');
}

function toggleLike(postId) {
    const post = MOCK_DATABASE.posts.find(p => p.id === postId);
    if (!post) return;
    
    const userId = APP_CONFIG.currentUser.id;
    const index = post.likes.indexOf(userId);
    
    if (index === -1) {
        post.likes.push(userId);
        showToast('Post liked!');
    } else {
        post.likes.splice(index, 1);
        showToast('Post unliked!');
    }
    
    loadPosts();
}

function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();
    
    if (!commentText) return;
    
    const post = MOCK_DATABASE.posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            userId: APP_CONFIG.currentUser.id,
            text: commentText
        });
        input.value = '';
        loadPosts();
        showToast('Comment added!');
    }
}

// ====== FRIENDS FUNCTIONS ======
function loadOnlineFriends() {
    const container = domElements.onlineFriendsList;
    if (!container) return;
    
    container.innerHTML = '';
    
    const onlineFriends = MOCK_DATABASE.users.filter(user => 
        user.id !== APP_CONFIG.currentUser?.id && user.online
    ).slice(0, 5);
    
    onlineFriends.forEach(friend => {
        const div = document.createElement('div');
        div.className = 'friend-item';
        div.innerHTML = `
            <img src="${friend.profilePic}" alt="${friend.name}">
            <div>
                <strong>${friend.name}</strong>
                <small>Online</small>
            </div>
        `;
        div.onclick = () => startChat(friend.id);
        container.appendChild(div);
    });
}

function loadFriendRequests() {
    const container = domElements.friendRequestsList;
    if (!container) return;
    
    container.innerHTML = `
        <div class="friend-request-item">
            <img src="https://i.pravatar.cc/50?img=11" alt="Alex">
            <div class="request-info">
                <strong>Alex Turner</strong>
                <small>2 mutual friends</small>
            </div>
            <div class="request-actions">
                <button class="accept-btn" onclick="acceptFriendRequest(1)">Accept</button>
                <button class="reject-btn" onclick="rejectFriendRequest(1)">Reject</button>
            </div>
        </div>
        <div class="friend-request-item">
            <img src="https://i.pravatar.cc/50?img=12" alt="Lisa">
            <div class="request-info">
                <strong>Lisa Park</strong>
                <small>5 mutual friends</small>
            </div>
            <div class="request-actions">
                <button class="accept-btn" onclick="acceptFriendRequest(2)">Accept</button>
                <button class="reject-btn" onclick="rejectFriendRequest(2)">Reject</button>
            </div>
        </div>
    `;
}

function acceptFriendRequest(requestId) {
    showToast('Friend request accepted!');
    loadFriendRequests();
}

function rejectFriendRequest(requestId) {
    showToast('Friend request rejected');
    loadFriendRequests();
}

function loadFriendsGrid() {
    const container = document.getElementById('friendsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const friends = MOCK_DATABASE.users.filter(user => 
        user.id !== APP_CONFIG.currentUser?.id
    );
    
    friends.forEach(friend => {
        const div = document.createElement('div');
        div.className = 'friend-grid-item';
        div.innerHTML = `
            <img src="${friend.profilePic}" alt="${friend.name}">
            <h4>${friend.name}</h4>
            <p>${friend.bio}</p>
            <div class="friend-actions">
                <button class="message-btn" onclick="startChat(${friend.id})">
                    <i class="fas fa-comment"></i> Message
                </button>
                <button class="remove-btn" onclick="removeFriend(${friend.id})">
                    <i class="fas fa-user-times"></i> Remove
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// ====== NOTIFICATIONS FUNCTIONS ======
function loadNotifications() {
    const container = domElements.notificationsList;
    if (!container) return;
    
    container.innerHTML = '';
    
    MOCK_DATABASE.notifications.forEach(notification => {
        const user = MOCK_DATABASE.users.find(u => u.id === notification.fromUserId);
        if (!user) return;
        
        const div = document.createElement('div');
        div.className = 'notification-item';
        div.innerHTML = `
            <img src="${user.profilePic}" alt="${user.name}">
            <div class="notification-content">
                <p><strong>${user.name}</strong> ${notification.message}</p>
                <small>${notification.time}</small>
            </div>
            ${notification.type === 'friend_request' ? `
                <div class="notification-actions">
                    <button class="accept-btn" onclick="acceptFriendRequest(${notification.id})">Accept</button>
                </div>
            ` : ''}
        `;
        container.appendChild(div);
    });
    
    updateBadges();
}

function updateBadges() {
    const messageCount = MOCK_DATABASE.messages.filter(m => 
        m.to === APP_CONFIG.currentUser?.id
    ).length;
    
    const notificationCount = MOCK_DATABASE.notifications.length;
    
    domElements.messageBadge.textContent = messageCount;
    domElements.notificationBadge.textContent = notificationCount;
    
    // Hide badge if count is 0
    domElements.messageBadge.style.display = messageCount > 0 ? 'flex' : 'none';
    domElements.notificationBadge.style.display = notificationCount > 0 ? 'flex' : 'none';
}

// ====== MESSAGING FUNCTIONS ======
function loadMessages() {
    // Implementation for messages section
}

function startChat(friendId) {
    showSection('messages');
    showToast('Opening chat...');
}

// ====== MEDIA FUNCTIONS ======
function openMediaUpload(type) {
    domElements.mediaUploadModal.classList.add('show');
}

function closeMediaUpload() {
    domElements.mediaUploadModal.classList.remove('show');
}

function uploadMedia() {
    showToast('Media uploaded successfully!');
    closeMediaUpload();
}

// ====== PROFILE FUNCTIONS ======
function loadProfilePosts() {
    const container = document.getElementById('profilePosts');
    if (!container || !APP_CONFIG.currentUser) return;
    
    container.innerHTML = '';
    
    const userPosts = MOCK_DATABASE.posts.filter(p => p.userId === APP_CONFIG.currentUser.id);
    
    if (userPosts.length === 0) {
        container.innerHTML = `
            <div class="no-posts">
                <i class="fas fa-edit"></i>
                <h3>No posts yet</h3>
                <p>Share your first post with the SociVerse community!</p>
                <button class="create-first-post" onclick="openQuickPost()">
                    Create First Post
                </button>
            </div>
        `;
        return;
    }
    
    userPosts.forEach(post => {
        const postElement = createPostElement(post, APP_CONFIG.currentUser);
        container.appendChild(postElement);
    });
}

function openEditProfile() {
    showToast('Edit profile feature coming soon!');
}

// ====== UI UTILITIES ======
function toggleProfileMenu() {
    domElements.profileDropdown.classList.toggle('show');
}

function openQuickPost() {
    domElements.quickPostModal.classList.add('show');
}

function closeQuickPost() {
    domElements.quickPostModal.classList.remove('show');
}

function createQuickPost() {
    const text = document.getElementById('quickPostText').value.trim();
    if (!text) return;
    
    const newPost = {
        id: MOCK_DATABASE.posts.length + 1,
        userId: APP_CONFIG.currentUser.id,
        content: text,
        likes: [],
        comments: [],
        shares: 0,
        createdAt: new Date().toISOString()
    };
    
    MOCK_DATABASE.posts.unshift(newPost);
    document.getElementById('quickPostText').value = '';
    
    closeQuickPost();
    showSection('feed');
    loadPosts();
    showToast('Quick post created!');
}

function searchTag(tag) {
    showToast(`Searching for ${tag}...`);
    // Implementation for tag search
}

function filterPosts(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    showToast(`Showing ${filter} posts`);
}

function loadMorePosts() {
    showToast('Loading more posts...');
    // Implementation for infinite scroll
}

// ====== HELPER FUNCTIONS ======
function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
}

function showToast(message, type = 'success') {
    const toast = domElements.toast;
    const toastMessage = domElements.toastMessage;
    
    toastMessage.textContent = message;
    
    // Set color based on type
    if (type === 'error') {
        toast.style.background = 'var(--accent-color)';
    } else if (type === 'warning') {
        toast.style.background = 'var(--warning-color)';
    } else {
        toast.style.background = 'var(--success-color)';
    }
    
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ====== EVENT LISTENERS ======
// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.user-profile') && domElements.profileDropdown.classList.contains('show')) {
        domElements.profileDropdown.classList.remove('show');
    }
    
    // Close modals when clicking outside
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + N for new post
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        openQuickPost();
    }
    
    // Escape to close modals
    if (event.key === 'Escape') {
        closeMediaUpload();
        closeQuickPost();
        domElements.profileDropdown.classList.remove('show');
    }
    
    // Ctrl/Cmd + / for search focus
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Initialize app
function initializeApp() {
    console.log(`${APP_CONFIG.appName} initialized successfully!`);
    
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('sociverse_user');
    if (savedUser && APP_CONFIG.demoMode) {
        try {
            APP_CONFIG.currentUser = JSON.parse(savedUser);
            startApp();
        } catch (e) {
            localStorage.removeItem('sociverse_user');
        }
    }
    
    // Simulate network connectivity
    setInterval(() => {
        APP_CONFIG.isOnline = navigator.onLine;
        if (!APP_CONFIG.isOnline) {
            showToast('You are offline. Some features may not work.', 'warning');
        }
    }, 30000);
}

// Save user data on page unload
window.addEventListener('beforeunload', function() {
    if (APP_CONFIG.currentUser && APP_CONFIG.demoMode) {
        localStorage.setItem('sociverse_user', JSON.stringify(APP_CONFIG.currentUser));
    }
});

// ====== ADDITIONAL FEATURES TO IMPLEMENT ======
/*
TODO Features:
1. Real-time messaging with WebSockets
2. Image upload with preview
3. Friend search and filtering
4. Post sharing functionality
5. Profile editing
6. Dark mode toggle
7. Responsive design improvements
8. Localization (Bangla/English)
9. PWA implementation
10. Push notifications
*/