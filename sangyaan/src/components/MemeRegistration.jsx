import { useState, useRef, useEffect } from 'react';

export default function MemeRegistration({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('funny');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [agree, setAgree] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const pickFile = () => fileInputRef.current?.click();
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const handleSubmit = () => {
    if (!title.trim() || !file || !agree) return;
    onSubmit({ title, category, description, file });
  };

  return (
    <div className="expanded-content">
      <div className="expanded-header">
        <div className="expanded-type-badge" style={{ backgroundColor: '#F59E0B' }}>
          <span className="event-icon">🖼️</span>
          <span className="event-type">Meme Submission</span>
        </div>
        <h2 className="expanded-title">Submit your STEM Meme</h2>
        <div className="expanded-date">Have fun and keep it respectful.</div>
      </div>

      <div className="expanded-body">
        <section className="details-section">
          <div className="detail-grid">
            <div className="detail-item">
              <h4>📛 Title</h4>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter meme title" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="detail-item">
              <h4>🏷️ Category</h4>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="funny">Funny</option>
                <option value="pun">Pun</option>
                <option value="physics">Physics</option>
                <option value="math">Math</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
          </div>
        </section>

        <section className="details-section">
          <div className="detail-grid">
            <div className="detail-item">
              <h4>📝 Description (optional)</h4>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Add a short caption or context" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="detail-item">
              <h4>📁 Upload Image</h4>
              <input ref={fileInputRef} onChange={onFileChange} type="file" accept="image/*" className="hidden" />
              <button onClick={pickFile} className="expanded-action-button join">Choose File</button>
              {previewUrl && (
                <div className="mt-3">
                  <img src={previewUrl} alt="Preview" className="max-h-64 rounded-md border" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            I confirm this is my original content and agree to community guidelines.
          </label>
        </section>
      </div>

      <div className="expanded-footer">
        <div className="expanded-stats">
          <div className="stat"><span className="stat-icon">🏆</span><span>200 XP reward</span></div>
          <div className="stat"><span className="stat-icon">👀</span><span>Top memes featured</span></div>
        </div>
        <div className="flex gap-2">
          <button className="expanded-action-button joined" onClick={onClose}>Cancel</button>
          <button disabled={!title || !file || !agree} className="expanded-action-button join" onClick={handleSubmit}>Submit Meme</button>
        </div>
      </div>
    </div>
  );
}
