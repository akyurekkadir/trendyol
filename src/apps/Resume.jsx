import React from 'react';

export default function Resume() {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center p-2">
      <iframe
        src="./Kadir_Akyurek_cv.pdf"
        title="Kadir Akyürek CV"
        width="100%"
        height="100%"
        className="rounded-lg shadow-sm border border-slate-200"
      >
        <p>PDF görüntülenemiyor. <a href="./Kadir_Akyurek_cv.pdf">Buradan indirebilirsiniz</a>.</p>
      </iframe>
    </div>
  );
}
