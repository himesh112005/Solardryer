class APIClient {
    constructor(baseURL = null) {
        this.baseURL = baseURL || this.getBaseURL();
        this.token = localStorage.getItem('token');
        this.ready = true;
        console.log('API Client initialized with baseURL:', this.baseURL);
    }

    getBaseURL() {
        if (typeof window !== 'undefined' && window.location) {
            return window.location.origin;
        }
        return 'http://localhost:5000';
    }

    // Get headers with auth token
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Safe JSON parsing
    async safeJsonParse(response) {
        try {
            const text = await response.text();
            
            if (!text || text.trim() === '') {
                return null;
            }
            
            return JSON.parse(text);
        } catch (error) {
            console.error('JSON parse error:', error);
            return null;
        }
    }

    // Auth endpoints
    async login(username, password) {
        try {
            console.log('Attempting login for:', username);
            
            const response = await fetch(`${this.baseURL}/api/auth/login`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ username, password })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const data = await this.safeJsonParse(response);
                
                if (data && data.message) {
                    return {
                        success: false,
                        message: data.message
                    };
                }
                
                return {
                    success: false,
                    message: `HTTP Error: ${response.status}`
                };
            }

            const data = await this.safeJsonParse(response);

            if (!data) {
                console.warn('Empty response from server');
                return {
                    success: false,
                    message: 'Empty response from server'
                };
            }

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                this.token = data.token;
                console.log('Login successful');
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.message || 'Login failed. Please check if server is running.'
            };
        }
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
    }

    // Send message
    async sendMessage(data) {
        try {
            console.log('Sending message to API...');
            
            const response = await fetch(`${this.baseURL}/api/messages`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
                timeout: 5000
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await this.safeJsonParse(response);
                return {
                    success: false,
                    message: errorData?.message || `HTTP Error: ${response.status}`
                };
            }

            const result = await this.safeJsonParse(response);
            return result || { success: true, message: 'Message sent' };
        } catch (error) {
            console.error('Error sending message:', error);
            return { 
                success: false, 
                message: 'Server not responding. Message will be saved locally.'
            };
        }
    }

    // Get all products
    async getProducts() {
        try {
            const response = await fetch(`${this.baseURL}/api/products`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, data: [] };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, data: [] };
        } catch (error) {
            console.error('Error fetching products:', error);
            return { success: false, data: [] };
        }
    }

    // Get all messages
    async getMessages() {
        try {
            const response = await fetch(`${this.baseURL}/api/messages`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, data: [] };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, data: [] };
        } catch (error) {
            console.error('Error fetching messages:', error);
            return { success: false, data: [] };
        }
    }

    // Get unread message count
    async getUnreadCount() {
        try {
            const response = await fetch(`${this.baseURL}/api/messages/count/unread`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, unreadCount: 0 };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, unreadCount: 0 };
        } catch (error) {
            console.error('Error fetching unread count:', error);
            return { success: false, unreadCount: 0 };
        }
    }

    // Update message status
    async updateMessageStatus(id, status) {
        try {
            const response = await fetch(`${this.baseURL}/api/messages/${id}/status`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: true };
        } catch (error) {
            console.error('Error updating message:', error);
            return { success: false };
        }
    }

    // Delete message
    async deleteMessage(id) {
        try {
            const response = await fetch(`${this.baseURL}/api/messages/${id}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: true };
        } catch (error) {
            console.error('Error deleting message:', error);
            return { success: false };
        }
    }

    // Get all users
    async getUsers() {
        try {
            const response = await fetch(`${this.baseURL}/api/users`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, data: [] };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, data: [] };
        } catch (error) {
            console.error('Error fetching users:', error);
            return { success: false, data: [] };
        }
    }

    // Create user
    async createUser(data) {
        try {
            const response = await fetch(`${this.baseURL}/api/users`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                return { success: false };
            }

            const result = await this.safeJsonParse(response);
            return result || { success: true };
        } catch (error) {
            console.error('Error creating user:', error);
            return { success: false };
        }
    }

    // Delete user
    async deleteUser(id) {
        try {
            const response = await fetch(`${this.baseURL}/api/users/${id}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: true };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false };
        }
    }

    // Get articles
    async getArticles() {
        try {
            const response = await fetch(`${this.baseURL}/api/articles`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, data: [] };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, data: [] };
        } catch (error) {
            console.error('Error fetching articles:', error);
            return { success: false, data: [] };
        }
    }

    // Create article
    async createArticle(data) {
        try {
            const response = await fetch(`${this.baseURL}/api/articles`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                return { success: false };
            }

            const result = await this.safeJsonParse(response);
            return result || { success: true };
        } catch (error) {
            console.error('Error creating article:', error);
            return { success: false };
        }
    }

    // Update article
    async updateArticle(id, data) {
        try {
            const response = await fetch(`${this.baseURL}/api/articles/${id}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                return { success: false };
            }

            const result = await this.safeJsonParse(response);
            return result || { success: true };
        } catch (error) {
            console.error('Error updating article:', error);
            return { success: false };
        }
    }

    // Delete article
    async deleteArticle(id) {
        try {
            const response = await fetch(`${this.baseURL}/api/articles/${id}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: true };
        } catch (error) {
            console.error('Error deleting article:', error);
            return { success: false };
        }
    }

    // Get settings
    async getSettings() {
        try {
            const response = await fetch(`${this.baseURL}/api/settings`, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                return { success: false, data: {} };
            }

            const data = await this.safeJsonParse(response);
            return data || { success: false, data: {} };
        } catch (error) {
            console.error('Error fetching settings:', error);
            return { success: false, data: {} };
        }
    }

    // Update settings
    async updateSettings(data) {
        try {
            const response = await fetch(`${this.baseURL}/api/settings`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                return { success: false };
            }

            const result = await this.safeJsonParse(response);
            return result || { success: true };
        } catch (error) {
            console.error('Error updating settings:', error);
            return { success: false };
        }
    }
}

// Create global API instance - Initialize when script loads
let api = null;

if (typeof window !== 'undefined') {
    // Initialize API client immediately
    api = new APIClient();
    console.log('✅ API Client initialized at:', api.baseURL);
    
    // Also handle if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (!api) {
                api = new APIClient();
                console.log('✅ API Client re-initialized on DOMContentLoaded');
            }
        });
    }
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIClient;
}
