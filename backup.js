/**
 * English4Kids - Backup & Google Drive Sync Module
 * - Method 1: Instant JSON File Export / Import (save directly to Google Drive via iPad/PC Files)
 * - Method 2: Direct 1-Tap Google Drive Sync via Google Identity Services (GIS) + Drive API v3
 */
(function () {
  const GDRIVE_CID_KEY = 'english4kids_gdrive_client_id';
  const GDRIVE_SYNC_KEY = 'english4kids_gdrive_last_sync';
  const DRIVE_FILE_NAME = 'english4kids_progress.json';
  const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

  let accessToken = null;
  let gisLoaded = false;

  const $ = id => document.getElementById(id);

  function buildBackupPayload() {
    return {
      app: 'English4Kids',
      version: 3,
      exportedAt: new Date().toISOString(),
      stars: state.stars,
      learnedIds: Array.from(state.learnedIds),
      learnedLetters: Array.from(state.learnedLetters),
      completedEpisodes: Array.from(state.completedEpisodes || []),
      lastActivity: state.lastActivity || null,
      soundEnabled: state.soundEnabled,
      srs: state.srs || { cards: {}, stats: {} },
      milestones: state.milestones || { results: {}, placement: null }
    };
  }

  function applyBackupPayload(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('File sao lưu không hợp lệ.');
    }
    if (typeof data.stars === 'number') state.stars = data.stars;
    if (Array.isArray(data.learnedIds)) state.learnedIds = new Set(data.learnedIds);
    if (Array.isArray(data.learnedLetters)) state.learnedLetters = new Set(data.learnedLetters);
    if (Array.isArray(data.completedEpisodes)) state.completedEpisodes = new Set(data.completedEpisodes);
    if (data.lastActivity && typeof data.lastActivity === 'object') state.lastActivity = data.lastActivity;
    if (typeof data.soundEnabled === 'boolean') state.soundEnabled = data.soundEnabled;
    if (data.srs && typeof data.srs === 'object') {
      state.srs = {
        cards: data.srs.cards && typeof data.srs.cards === 'object' ? data.srs.cards : {},
        stats: { ...(state.srs && state.srs.stats ? state.srs.stats : {}), ...(data.srs.stats || {}) }
      };
    }
    if (data.milestones && typeof data.milestones === 'object') {
      state.milestones = {
        results: data.milestones.results && typeof data.milestones.results === 'object' ? data.milestones.results : {},
        placement: data.milestones.placement || null
      };
    }

    saveProgress();
    updateHeaderAndMissionUI();
    if (typeof renderRecentActivityCard === 'function') renderRecentActivityCard();
    if (typeof renderTopicsGrid === 'function') renderTopicsGrid();
    if (typeof window.refreshPhonicsUI === 'function') window.refreshPhonicsUI();
    if (typeof window.refreshSrsUI === 'function') window.refreshSrsUI();
    if (typeof window.refreshMilestonesUI === 'function') window.refreshMilestonesUI();
  }

  function showStatus(msg, isError = false) {
    const banner = $('backup-status-banner');
    if (!banner) return;
    banner.textContent = msg;
    banner.classList.remove('hidden', 'is-error', 'is-success');
    banner.classList.add(isError ? 'is-error' : 'is-success');
  }

  function updateSyncTimestampUI(iso) {
    const el = $('gdrive-last-sync');
    if (!el) return;
    if (!iso) {
      el.textContent = 'Chưa đồng bộ lần nào.';
      return;
    }
    try {
      const d = new Date(iso);
      el.textContent = `🕒 Lần đồng bộ gần nhất: ${ d.toLocaleString('vi-VN') }`;
    } catch (e) {
      el.textContent = `🕒 Lần đồng bộ gần nhất: ${ iso }`;
    }
  }

  /* ------------------------------------------------------------------
     Method 1: Instant File Export / Import
     ------------------------------------------------------------------ */
  function exportBackupFile() {
    const payload = buildBackupPayload();
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateTag = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english4kids-backup-${ dateTag }.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);

    playSoundEffect('star');
    showStatus(`✅ Đã xuất file sao lưu (${ payload.learnedIds.length } từ, ${ payload.stars } sao)! Bạn có thể lưu file này vào Google Drive.`);
  }

  function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ''));
        applyBackupPayload(parsed);
        playSoundEffect('star');
        launchConfettiBurst();
        showStatus(`🎉 Khôi phục thành công: ${ state.learnedIds.size } từ vựng, ${ state.learnedLetters.size } chữ ABC và ${ state.stars } sao vàng!`);
      } catch (err) {
        playSoundEffect('wrong');
        showStatus('❌ Không thể đọc file sao lưu. Hãy chọn đúng file .json đã xuất từ English4Kids.', true);
      }
    };
    reader.readAsText(file);
  }

  /* ------------------------------------------------------------------
     Method 2: Direct Google Drive Sync (GIS + Drive API v3)
     ------------------------------------------------------------------ */
  function loadGoogleIdentityScript() {
    return new Promise((resolve, reject) => {
      if (gisLoaded && window.google && window.google.accounts && window.google.accounts.oauth2) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[data-gis="1"]');
      if (existing) {
        existing.addEventListener('load', () => { gisLoaded = true; resolve(); });
        existing.addEventListener('error', () => reject(new Error('Không thể tải thư viện Google Sign-In.')));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.gis = '1';
      script.onload = () => { gisLoaded = true; resolve(); };
      script.onerror = () => reject(new Error('Không thể tải thư viện Google Sign-In (kiểm tra kết nối mạng).'));
      document.head.appendChild(script);
    });
  }

  function setDriveConnectedUI(connected) {
    const badge = $('gdrive-conn-badge');
    const upBtn = $('btn-gdrive-upload');
    const dlBtn = $('btn-gdrive-download');
    if (badge) {
      badge.textContent = connected ? '✅ Đã kết nối Drive' : 'Chưa kết nối';
      badge.className = `phase-badge ${ connected ? 'done' : 'upcoming' }`;
    }
    if (upBtn) upBtn.disabled = !connected;
    if (dlBtn) dlBtn.disabled = !connected;
  }

  async function connectGoogleDrive() {
    const cid = ($('gdrive-client-id').value || '').trim();
    if (!cid || !cid.includes('.apps.googleusercontent.com')) {
      playSoundEffect('wrong');
      showStatus('⚠️ Hãy dán Google OAuth Client ID (đuôi .apps.googleusercontent.com) và bấm Lưu trước khi kết nối.', true);
      return;
    }
    localStorage.setItem(GDRIVE_CID_KEY, cid);
    showStatus('⏳ Đang mở cửa sổ đăng nhập Google Drive...');

    try {
      await loadGoogleIdentityScript();
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: cid,
        scope: DRIVE_SCOPE,
        callback: resp => {
          if (resp.error) {
            playSoundEffect('wrong');
            showStatus(`❌ Đăng nhập Google thất bại: ${ resp.error }`, true);
            return;
          }
          accessToken = resp.access_token;
          setDriveConnectedUI(true);
          playSoundEffect('correct');
          showStatus('✅ Đã kết nối Google Drive thành công! Giờ bạn có thể bấm "Lưu lên Drive" hoặc "Tải từ Drive".');
        }
      });
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (err) {
      playSoundEffect('wrong');
      showStatus(`❌ ${ err.message }`, true);
    }
  }

  async function findDriveBackupFileId() {
    const q = encodeURIComponent(`name='${ DRIVE_FILE_NAME }' and trashed=false`);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${ q }&fields=files(id,name,modifiedTime)`, {
      headers: { Authorization: `Bearer ${ accessToken }` }
    });
    if (!res.ok) throw new Error(`Google Drive trả lỗi HTTP ${ res.status }`);
    const data = await res.json();
    return data.files && data.files.length > 0 ? data.files[0].id : null;
  }

  async function uploadToGoogleDrive() {
    if (!accessToken) {
      showStatus('⚠️ Bạn cần bấm "Kết nối Google Drive" trước.', true);
      return;
    }
    showStatus('☁️ Đang lưu tiến trình lên Google Drive...');
    try {
      const existingId = await findDriveBackupFileId();
      const payload = JSON.stringify(buildBackupPayload(), null, 2);

      const boundary = 'english4kids_boundary_2026';
      const metadata = JSON.stringify({
        name: DRIVE_FILE_NAME,
        mimeType: 'application/json'
      });
      const multipartBody =
        `--${ boundary }\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${ metadata }\r\n` +
        `--${ boundary }\r\n` +
        `Content-Type: application/json\r\n\r\n` +
        `${ payload }\r\n` +
        `--${ boundary }--`;

      const endpoint = existingId
        ? `https://www.googleapis.com/upload/drive/v3/files/${ existingId }?uploadType=multipart`
        : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
      const method = existingId ? 'PATCH' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'Content-Type': `multipart/related; boundary=${ boundary }`
        },
        body: multipartBody
      });
      if (!res.ok) throw new Error(`Không thể tải lên (HTTP ${ res.status })`);

      const nowIso = new Date().toISOString();
      localStorage.setItem(GDRIVE_SYNC_KEY, nowIso);
      updateSyncTimestampUI(nowIso);
      playSoundEffect('star');
      launchConfettiBurst();
      showStatus(`✅ Đã lưu tiến trình lên Google Drive (${ DRIVE_FILE_NAME }) thành công!`);
    } catch (err) {
      playSoundEffect('wrong');
      showStatus(`❌ Lỗi khi lưu lên Drive: ${ err.message }`, true);
    }
  }

  async function downloadFromGoogleDrive() {
    if (!accessToken) {
      showStatus('⚠️ Bạn cần bấm "Kết nối Google Drive" trước.', true);
      return;
    }
    showStatus('📥 Đang tìm bản sao lưu trên Google Drive...');
    try {
      const fileId = await findDriveBackupFileId();
      if (!fileId) {
        showStatus('ℹ️ Chưa tìm thấy file english4kids_progress.json trên Google Drive. Hãy bấm "Lưu lên Drive" trước nhé!', true);
        return;
      }
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${ fileId }?alt=media`, {
        headers: { Authorization: `Bearer ${ accessToken }` }
      });
      if (!res.ok) throw new Error(`Không thể tải file (HTTP ${ res.status })`);
      const parsed = await res.json();
      applyBackupPayload(parsed);

      const nowIso = new Date().toISOString();
      localStorage.setItem(GDRIVE_SYNC_KEY, nowIso);
      updateSyncTimestampUI(nowIso);
      playSoundEffect('star');
      launchConfettiBurst();
      showStatus(`🎉 Đã khôi phục từ Google Drive: ${ state.learnedIds.size } từ vựng, ${ state.learnedLetters.size } chữ ABC và ${ state.stars } sao vàng!`);
    } catch (err) {
      playSoundEffect('wrong');
      showStatus(`❌ Lỗi khi tải từ Drive: ${ err.message }`, true);
    }
  }

  /* ------------------------------------------------------------------
     Event Binding
     ------------------------------------------------------------------ */
  function bindBackupEvents() {
    const modal = $('backup-modal');
    if (!modal) return;

    const savedCid = localStorage.getItem(GDRIVE_CID_KEY) || '';
    if ($('gdrive-client-id')) $('gdrive-client-id').value = savedCid;
    updateSyncTimestampUI(localStorage.getItem(GDRIVE_SYNC_KEY));

    const originCode = $('gdrive-origin-code');
    if (originCode && window.location.origin && window.location.origin.startsWith('http')) {
      originCode.textContent = window.location.origin;
    }

    $('btn-backup-modal').addEventListener('click', () => {
      playSoundEffect('pop');
      modal.classList.remove('hidden');
    });

    $('btn-close-backup').addEventListener('click', () => {
      playSoundEffect('pop');
      modal.classList.add('hidden');
    });

    $('btn-export-json').addEventListener('click', exportBackupFile);
    $('btn-import-json').addEventListener('click', () => {
      $('input-import-json').value = '';
      $('input-import-json').click();
    });
    $('input-import-json').addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (file) handleImportFile(file);
    });

    $('btn-save-client-id').addEventListener('click', () => {
      const val = ($('gdrive-client-id').value || '').trim();
      localStorage.setItem(GDRIVE_CID_KEY, val);
      playSoundEffect('pop');
      showStatus(val ? '✅ Đã lưu Google Client ID! Bấm "Kết nối Google Drive" để đăng nhập.' : 'ℹ️ Đã xóa Google Client ID.');
    });

    $('btn-gdrive-connect').addEventListener('click', connectGoogleDrive);
    $('btn-gdrive-upload').addEventListener('click', uploadToGoogleDrive);
    $('btn-gdrive-download').addEventListener('click', downloadFromGoogleDrive);

    $('btn-copy-origin').addEventListener('click', async () => {
      const text = $('gdrive-origin-code').textContent;
      try {
        await navigator.clipboard.writeText(text);
        showStatus(`📋 Đã sao chép địa chỉ: ${ text }`);
      } catch (e) {
        showStatus(`ℹ️ Địa chỉ cần dán vào Google Cloud: ${ text }`);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', bindBackupEvents);
})();
