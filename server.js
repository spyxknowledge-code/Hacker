const express = require('express');
const { InstagraNode } = require('instagranode');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>𝕀𝕟𝕤𝕥𝕒ℍ𝕒𝕔𝕜 • Analyzer</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; user-select:none; }
    body {
      background: #0b0b12;
      color: #00ffc8;
      font-family: 'Share Tech Mono', monospace;
      height: 100vh;
      display: flex;
      overflow: hidden;
      background-image: radial-gradient(circle at 20% 50%, rgba(0,255,200,0.03) 0%, transparent 60%);
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0b0b12; }
    ::-webkit-scrollbar-thumb { background: #00ffc8; border-radius: 4px; }

    /* Sidebar */
    .sidebar {
      width: 220px;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(12px);
      border-right: 1px solid rgba(0,255,200,0.15);
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
    }
    .sidebar .logo {
      font-family: 'Orbitron', sans-serif;
      font-weight: 900;
      font-size: 1.6rem;
      background: linear-gradient(135deg, #00ffc8, #ff00a0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
    .sidebar .logo small { font-size: 0.7rem; display: block; -webkit-text-fill-color: #00ffc8; opacity:0.6; letter-spacing: 4px; }
    .sidebar .nav-item {
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      color: #8899aa;
      font-size: 0.85rem;
      transition: 0.25s;
      border-left: 2px solid transparent;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .sidebar .nav-item:hover { background: rgba(0,255,200,0.05); color: #00ffc8; border-left-color: #00ffc8; }
    .sidebar .nav-item.active { background: rgba(0,255,200,0.08); color: #00ffc8; border-left-color: #00ffc8; box-shadow: 0 0 20px rgba(0,255,200,0.05); }
    .sidebar .nav-item .icon { font-size: 1.2rem; }
    .sidebar .coming-badge { font-size:0.55rem; background:rgba(255,0,160,0.2); color:#ff00a0; padding:2px 8px; border-radius:12px; margin-left:auto; }
    .sidebar .nav-item.coming:hover .coming-badge { animation: pulse-badge 0.8s infinite alternate; }
    @keyframes pulse-badge { 0% { opacity:0.5; } 100% { opacity:1; transform:scale(1.05); } }

    /* Main */
    .main {
      margin-left: 220px;
      flex:1;
      padding: 30px 40px;
      overflow-y: auto;
      height: 100vh;
      background: radial-gradient(circle at 80% 20%, rgba(0,255,200,0.02), transparent 70%);
    }
    .main .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(0,255,200,0.08);
    }
    .main .header h1 { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 1.8rem; background: linear-gradient(135deg, #00ffc8, #ff00a0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .main .header .status { font-size:0.8rem; color:#00ffc8; opacity:0.6; }
    .search-box {
      display: flex;
      gap: 12px;
      max-width: 500px;
      margin-bottom: 30px;
      background: rgba(0,0,0,0.4);
      border-radius: 40px;
      padding: 4px;
      border: 1px solid rgba(0,255,200,0.1);
    }
    .search-box input {
      flex:1;
      background: transparent;
      border: none;
      padding: 14px 20px;
      color: #fff;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.95rem;
      outline: none;
    }
    .search-box input::placeholder { color: #445566; }
    .search-box button {
      padding: 14px 32px;
      border: none;
      border-radius: 40px;
      background: linear-gradient(135deg, #00ffc8, #00aaff);
      color: #0b0b12;
      font-weight: 700;
      font-family: 'Orbitron', sans-serif;
      cursor: pointer;
      transition: 0.3s;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.8rem;
    }
    .search-box button:hover { transform: scale(1.03); box-shadow: 0 0 30px rgba(0,255,200,0.3); }

    /* Dashboard Grid */
    .dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .card {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(0,255,200,0.06);
      transition: 0.2s;
    }
    .card:hover { border-color: rgba(0,255,200,0.15); box-shadow: 0 0 30px rgba(0,255,200,0.02); }
    .card .card-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 0.8rem;
      color: #8899aa;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .card .value {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00ffc8, #ff00a0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }
    .card .sub-value { color: #aabbcc; font-size: 0.9rem; margin-top: 6px; }
    .card .glow-line { width:100%; height:1px; background:linear-gradient(90deg, transparent, #00ffc8, transparent); margin:12px 0; opacity:0.2; }

    .full-width { grid-column: 1 / -1; }

    /* Coming Soon popup */
    .coming-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.95);
      backdrop-filter: blur(30px);
      border: 1px solid rgba(0,255,200,0.3);
      border-radius: 24px;
      padding: 40px 60px;
      text-align: center;
      z-index: 999;
      box-shadow: 0 0 80px rgba(0,255,200,0.1);
      animation: popIn 0.3s ease;
      display: none;
    }
    .coming-popup h2 { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; background: linear-gradient(135deg, #ff00a0, #00ffc8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .coming-popup p { color: #8899aa; margin: 16px 0 24px; font-size: 1.1rem; }
    .coming-popup button { padding: 12px 40px; border: none; border-radius: 40px; background: #00ffc8; color: #0b0b12; font-weight: 700; font-family: 'Orbitron', sans-serif; cursor: pointer; }
    .coming-popup button:hover { box-shadow: 0 0 40px rgba(0,255,200,0.3); }
    @keyframes popIn { from { opacity:0; transform:translate(-50%,-50%) scale(0.9); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }

    /* Posts grid */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .post-thumb {
      border-radius: 8px;
      overflow: hidden;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.03);
      transition: 0.2s;
    }
    .post-thumb:hover { border-color: #00ffc8; }
    .post-thumb img { width:100%; aspect-ratio:1; object-fit:cover; display:block; }
    .post-thumb .meta { padding: 6px 8px; display: flex; justify-content: space-between; font-size:0.7rem; color:#8899aa; }

    /* Responsive */
    @media (max-width: 900px) {
      .dashboard { grid-template-columns: 1fr; }
      .sidebar { width: 60px; padding: 16px 8px; }
      .sidebar .logo small { display: none; }
      .sidebar .nav-item span:not(.icon) { display: none; }
      .sidebar .coming-badge { display: none; }
      .main { margin-left: 60px; padding: 20px; }
    }
  </style>
</head>
<body>

<!-- Sidebar -->
<div class="sidebar">
  <div class="logo">Insta<span style="-webkit-text-fill-color:#ff00a0;">Hack</span><small>analyzer</small></div>
  <div class="nav-item active" data-page="dashboard"><span class="icon">📊</span><span>Dashboard</span></div>
  <div class="nav-item" data-page="growth"><span class="icon">📈</span><span>Growth</span></div>
  <div class="nav-item" data-page="posts"><span class="icon">🖼️</span><span>Posts</span></div>
  <div class="nav-item coming" data-feature="Hashtag Analyzer"><span class="icon">#️⃣</span><span>Hashtags</span><span class="coming-badge">soon</span></div>
  <div class="nav-item coming" data-feature="Competitor Watch"><span class="icon">👀</span><span>Competitors</span><span class="coming-badge">soon</span></div>
  <div class="nav-item coming" data-feature="Content Generator"><span class="icon">🤖</span><span>AI Content</span><span class="coming-badge">soon</span></div>
  <div class="nav-item coming" data-feature="Live Followers"><span class="icon">📡</span><span>Live Followers</span><span class="coming-badge">soon</span></div>
  <div class="nav-item coming" data-feature="Report Export"><span class="icon">📄</span><span>Export PDF</span><span class="coming-badge">soon</span></div>
</div>

<!-- Main -->
<div class="main">
  <div class="header">
    <h1>📡 Control Panel</h1>
    <span class="status">● online</span>
  </div>

  <div class="search-box">
    <input type="text" id="usernameInput" placeholder="Enter Instagram username...">
    <button id="analyzeBtn">⟡ Scan</button>
  </div>

  <div id="loading" style="display:none; text-align:center; padding:40px; color:#00ffc8;">⟳ fetching profile...</div>
  <div id="error" style="display:none; color:#ff4466; background:rgba(255,68,102,0.1); border-radius:12px; padding:16px; margin-bottom:20px;"></div>

  <div id="dashboard" class="dashboard"></div>
</div>

<!-- Coming Soon Popup -->
<div class="coming-popup" id="comingPopup">
  <h2>⚡ COMING SOON</h2>
  <p id="featureName">This feature is under development.</p>
  <button id="closePopup">Close</button>
</div>

<script>
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', function() {
      if (this.classList.contains('coming')) {
        const feature = this.dataset.feature || 'This feature';
        document.getElementById('featureName').textContent = feature + ' – coming soon. Stay tuned!';
        document.getElementById('comingPopup').style.display = 'block';
        return;
      }
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      // could switch views, but we keep dashboard always
    });
  });

  document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('comingPopup').style.display = 'none';
  });
  document.getElementById('comingPopup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) document.getElementById('comingPopup').style.display = 'none';
  });

  // Analyze button
  document.getElementById('analyzeBtn').addEventListener('click', analyze);
  document.getElementById('usernameInput').addEventListener('keydown', e => { if (e.key === 'Enter') analyze(); });

  async function analyze() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) { showError('Enter a username.'); return; }
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dashboard = document.getElementById('dashboard');
    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    dashboard.innerHTML = '';

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');
      loading.style.display = 'none';
      renderDashboard(data);
    } catch (err) {
      loading.style.display = 'none';
      showError(err.message);
    }
  }

  function showError(msg) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '⛔ ' + msg;
    errorDiv.style.display = 'block';
  }

  function renderDashboard(data) {
    const dash = document.getElementById('dashboard');
    let html = '';

    // Profile card
    html += \`
      <div class="card full-width" style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
        <img src="\${data.profilePic || ''}" style="width:80px; height:80px; border-radius:50%; border:2px solid #00ffc8;">
        <div>
          <div style="font-family: 'Orbitron', sans-serif; font-size:1.6rem;">\${data.fullName || data.username}</div>
          <div style="color:#8899aa;">@\${data.username} \${data.isVerified ? '✅' : ''} \${data.isBusiness ? '💼' : ''}</div>
          <div style="color:#aabbcc; max-width:400px; margin-top:6px;">\${data.bio || 'No bio'}</div>
        </div>
      </div>
    \`;

    // Stats
    html += \`
      <div class="card"><div class="card-title">👥 Followers</div><div class="value">\${data.followers}</div></div>
      <div class="card"><div class="card-title">👤 Following</div><div class="value">\${data.following}</div></div>
      <div class="card"><div class="card-title">📸 Posts</div><div class="value">\${data.posts}</div></div>
      <div class="card"><div class="card-title">📊 Engagement Rate</div><div class="value">\${data.engagementRate || '0%'}</div></div>
    \`;

    // Growth estimates
    html += \`
      <div class="card full-width">
        <div class="card-title">📈 Growth Estimate</div>
        <div style="display:flex; gap:30px; flex-wrap:wrap; margin-top:6px;">
          <div><span style="color:#8899aa;">Per Month</span> <span style="font-size:1.6rem; font-weight:700; color:#00ffc8;">\${data.estimatedGrowth?.perMonth || 0}</span></div>
          <div><span style="color:#8899aa;">Per Day</span> <span style="font-size:1.6rem; font-weight:700; color:#00ffc8;">\${data.estimatedGrowth?.perDay || 0}</span></div>
          <div><span style="color:#8899aa;">Account Age</span> <span style="font-size:1.4rem; font-weight:700; color:#ff00a0;">\${data.estimatedGrowth?.sinceAccountCreation || 'N/A'}</span></div>
        </div>
      </div>
    \`;

    // Next post estimate
    html += \`
      <div class="card full-width" style="border-color:rgba(255,0,160,0.2); background:rgba(255,0,160,0.03);">
        <div class="card-title" style="color:#ff00a0;">🔥 Next Post Estimate</div>
        <div style="font-size:2.8rem; font-weight:700; background:linear-gradient(135deg,#ff00a0,#00ffc8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">\${data.estimatedNextPostViews || 0}</div>
        <div style="color:#8899aa; font-size:0.9rem;">Range: \${data.estimatedNextPostRange?.low || 0} – \${data.estimatedNextPostRange?.high || 0}</div>
      </div>
    \`;

    // Recent posts
    if (data.posts && data.posts.length > 0) {
      html += \`
        <div class="card full-width">
          <div class="card-title">🖼️ Recent Posts</div>
          <div class="posts-grid">
      \`;
      data.posts.slice(0, 12).forEach(p => {
        html += \`
          <div class="post-thumb">
            <img src="\${p.displayUrl || ''}" alt="post">
            <div class="meta"><span>❤️ \${p.likes}</span><span>💬 \${p.comments}</span></div>
          </div>
        \`;
      });
      html += \`</div></div>\`;
    }

    dash.innerHTML = html;
  }
</script>
</body>
</html>
  `);
});

// ---------- API ----------
app.post('/api/analyze', async (req, res) => {
  const { username } = req.body;
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Username required' });
  }
  try {
    const ig = new InstagraNode({ browser: 'chrome-mac' });
    const profile = await ig.searchProfile(username.trim());
    if (!profile || !profile.id) {
      return res.status(404).json({ error: 'Profile not found or private' });
    }

    const result = {
      username: profile.username,
      fullName: profile.fullName || '',
      bio: profile.biography || '',
      profilePic: profile.profilePicUrl || '',
      followers: profile.followerCount || 0,
      following: profile.followingCount || 0,
      posts: profile.postCount || 0,
      isPrivate: profile.isPrivate || false,
      isVerified: profile.isVerified || false,
      isBusiness: profile.isBusinessAccount || false,
      posts: (profile.latestPosts || []).slice(0, 12).map(p => ({
        id: p.id,
        displayUrl: p.displayUrl || '',
        likes: p.likesCount || 0,
        comments: p.commentsCount || 0,
        caption: p.caption || '',
        timestamp: p.timestamp || ''
      }))
    };

    // Engagement
    const postsWithEng = result.posts.filter(p => p.likes > 0 || p.comments > 0);
    let avg = 0;
    if (postsWithEng.length > 0) {
      const total = postsWithEng.reduce((s, p) => s + p.likes + p.comments, 0);
      avg = Math.round(total / postsWithEng.length);
      result.engagementRate = result.followers > 0 ? ((avg / result.followers) * 100).toFixed(2) + '%' : '0%';
    } else {
      result.engagementRate = '0%';
    }

    // Growth
    const estMonths = profile.is_joined_recently ? 3 : 24;
    const perMonth = Math.round(result.followers / Math.max(estMonths, 1));
    result.estimatedGrowth = {
      perMonth,
      perDay: Math.round(perMonth / 30),
      sinceAccountCreation: estMonths + '+ months'
    };

    // Next views
    const factor = Math.random() * 0.2 + 0.1;
    const views = Math.round(result.followers * factor);
    result.estimatedNextPostViews = views;
    result.estimatedNextPostRange = {
      low: Math.round(result.followers * 0.08),
      high: Math.round(result.followers * 0.35)
    };

    res.json(result);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
