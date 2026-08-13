export const standaloneHtmlCss = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Dark Theme</title>
  <!-- Google Font: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* =========================================================
       CSS3 STYLING - MODERN DARK THEME
       ========================================================= */
    :root {
      --bg-primary: #09090b;
      --bg-card: rgba(24, 24, 27, 0.85);
      --bg-input: #18181b;
      --bg-input-focus: #27272a;
      --border-subtle: #27272a;
      --border-focus: #6366f1;
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-placeholder: #71717a;
      --accent-primary: #4f46e5;
      --accent-hover: #4338ca;
      --accent-glow: rgba(99, 102, 241, 0.25);
      --error-color: #ef4444;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --transition-base: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-primary);
      color: var(--text-main);
      padding: 24px;
      background-image: 
        radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%);
    }

    .login-container {
      width: 100%;
      max-width: 440px;
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 40px 32px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
    }

    .brand-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .brand-logo {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      background: linear-gradient(135deg, #4f46e5, #9333ea);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 8px 16px -4px var(--accent-glow);
    }

    .brand-header h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }

    .brand-header p {
      font-size: 14px;
      color: var(--text-muted);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      color: var(--text-placeholder);
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input-control {
      width: 100%;
      height: 46px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 0 16px 0 44px;
      font-size: 14px;
      color: var(--text-main);
      transition: var(--transition-base);
      outline: none;
    }

    .input-control::placeholder {
      color: var(--text-placeholder);
    }

    .input-control:focus {
      background: var(--bg-input-focus);
      border-color: var(--border-focus);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .toggle-password {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-placeholder);
      cursor: pointer;
      padding: 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      transition: var(--transition-base);
    }

    .toggle-password:hover {
      color: var(--text-main);
    }

    .form-actions-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: 13px;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      color: var(--text-muted);
    }

    .remember-me input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      background: var(--bg-input);
      cursor: pointer;
      display: grid;
      place-content: center;
      transition: var(--transition-base);
    }

    .remember-me input[type="checkbox"]:checked {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }

    .remember-me input[type="checkbox"]:checked::before {
      content: "";
      width: 8px;
      height: 8px;
      box-shadow: inset 1em 1em #ffffff;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    .remember-me:hover {
      color: var(--text-main);
    }

    .forgot-link {
      color: #818cf8;
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition-base);
    }

    .forgot-link:hover {
      color: #a5b4fc;
      text-decoration: underline;
    }

    .btn-submit {
      width: 100%;
      height: 46px;
      background: var(--accent-primary);
      color: #ffffff;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.01em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: var(--transition-base);
      box-shadow: 0 4px 12px var(--accent-glow);
    }

    .btn-submit:hover {
      background: var(--accent-hover);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
      transform: translateY(-1px);
    }

    .btn-submit:active {
      transform: translateY(0);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 24px 0;
      color: var(--text-placeholder);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--border-subtle);
    }

    .divider span {
      padding: 0 12px;
    }

    .social-auth {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .btn-social {
      height: 40px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-main);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: var(--transition-base);
    }

    .btn-social:hover {
      background: var(--bg-input-focus);
      border-color: #3f3f46;
    }

    .footer-note {
      text-align: center;
      margin-top: 28px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .footer-note a {
      color: #818cf8;
      text-decoration: none;
      font-weight: 500;
    }

    .footer-note a:hover {
      text-decoration: underline;
    }

    /* Responsive adjustment */
    @media (max-width: 480px) {
      .login-container {
        padding: 32px 20px;
      }
      .social-auth {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <div class="login-container">
    <!-- Brand Header -->
    <div class="brand-header">
      <div class="brand-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
        </svg>
      </div>
      <h1>Welcome Back</h1>
      <p>Enter your credentials to access your account</p>
    </div>

    <!-- Login Form -->
    <form id="loginForm" onsubmit="handleLogin(event)">
      <!-- Username or Email Field -->
      <div class="form-group">
        <label for="username">Email or Username</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <input 
            type="text" 
            id="username" 
            name="username" 
            class="input-control" 
            placeholder="name@example.com" 
            required 
            autocomplete="username"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input 
            type="password" 
            id="password" 
            name="password" 
            class="input-control" 
            placeholder="Enter your password" 
            required 
            autocomplete="current-password"
          />
          <button type="button" class="toggle-password" id="togglePasswordBtn" onclick="togglePasswordVisibility()" aria-label="Toggle password visibility">
            <svg id="eyeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Remember Me & Forgot Password Row -->
      <div class="form-actions-row">
        <label class="remember-me">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <span>Remember me</span>
        </label>
        <a href="#forgot" class="forgot-link">Forgot password?</a>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-submit" id="submitBtn">
        <span>Sign In</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </form>

    <div class="divider">
      <span>Or continue with</span>
    </div>

    <!-- Social Sign In Options -->
    <div class="social-auth">
      <button class="btn-social" type="button" onclick="alert('Google Sign-in clicked')">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
          <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
          <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
        </svg>
        <span>Google</span>
      </button>
      <button class="btn-social" type="button" onclick="alert('GitHub Sign-in clicked')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        <span>GitHub</span>
      </button>
    </div>

    <!-- Footer Register Prompt -->
    <div class="footer-note">
      Don't have an account? <a href="#register">Sign up</a>
    </div>
  </div>

  <script>
    /* =========================================================
       JAVASCRIPT INTERACTIONS (Visibility Toggle & Form Handler)
       ========================================================= */
    function togglePasswordVisibility() {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // Eye-off icon
        eyeIcon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>';
      } else {
        passwordInput.type = 'password';
        // Eye icon
        eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
      }
    }

    function handleLogin(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const rememberMe = document.getElementById('rememberMe').checked;
      const submitBtn = document.getElementById('submitBtn');
      
      submitBtn.innerHTML = '<span>Signing In...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Login successful for: ' + username + (rememberMe ? ' (Remember Me enabled)' : ''));
        submitBtn.innerHTML = '<span>Sign In</span>';
        submitBtn.disabled = false;
      }, 1000);
    }
  </script>
</body>
</html>
`;
