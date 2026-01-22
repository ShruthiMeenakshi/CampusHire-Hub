(function renderProfileView(){
  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('profileOverview');
    if (!mount) return;
    let data = null;
    try { data = JSON.parse(localStorage.getItem('ch_profile') || 'null'); } catch(_) {}

    if (!data) {
      mount.innerHTML = '<div class="empty">No profile found. <a class="btn link" href="profile.html">Create/Edit your profile</a>.</div>';
      return;
    }

    const fields = [
      ['Full Name', 'fullName'],
      ['Student ID', 'studentId'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Department', 'department'],
      ['Program', 'program'],
      ['Year', 'year'],
      ['CGPA', 'cgpa'],
      ['Skills', 'skills'],
      ['Resume URL', 'resumeUrl'],
      ['Portfolio URL', 'portfolioUrl'],
      ['LinkedIn URL', 'linkedinUrl'],
      ['GitHub URL', 'githubUrl'],
      ['LeetCode URL', 'leetcodeUrl']
    ];

    const frag = document.createDocumentFragment();
    fields.forEach(([label, key]) => {
      const item = document.createElement('div');
      item.className = 'item';
      const l = document.createElement('label');
      l.textContent = label;
      const v = document.createElement('div');
      v.className = 'value';
      const val = (data[key] || '').toString();
      if (key.endsWith('Url') && val) {
        const a = document.createElement('a');
        a.href = val; a.textContent = val; a.target = '_blank';
        v.appendChild(a);
      } else {
        v.textContent = val || '—';
      }
      item.append(l, v);
      frag.appendChild(item);
    });
    mount.innerHTML = '';
    mount.appendChild(frag);
  });
})();
