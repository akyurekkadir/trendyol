import React from 'react';
import { Folder, HardDrive, User, Code, Database, BrainCircuit, GraduationCap } from 'lucide-react';

export default function Finder() {
  return (
    <div className="flex h-full w-full text-slate-800">
      {/* Sidebar */}
      <div className="w-48 bg-slate-100/50 backdrop-blur-xl border-r border-slate-200 p-4 shrink-0 overflow-y-auto">
        <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Favoriler</h3>
        <ul className="space-y-1 mb-6">
          <li className="flex items-center gap-2 px-2 py-1.5 bg-blue-500 text-white rounded-md text-sm cursor-default">
            <User size={16} /> Hakkımda
          </li>
          <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded-md text-sm text-slate-700 cursor-default">
            <Folder size={16} className="text-blue-500" /> Belgeler
          </li>
        </ul>

        <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Konumlar</h3>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded-md text-sm text-slate-700 cursor-default">
            <HardDrive size={16} className="text-slate-400" /> Macintosh HD
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">

          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg shrink-0 overflow-hidden">
              {/* Monogram or Photo */}
              KA
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Kadir Akyürek</h1>
              <h2 className="text-xl text-slate-600 mb-4 tracking-tight">4th-Year Computer Engineering Student</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                I am a senior Computer Engineering student at Haliç University with a full scholarship. Passionate about AI, Data Engineering, and Machine Learning.
                Recently ranked Top 10 in Google AI Datathon and 2nd in Haier Europe Sell-In Forecasting Datathon. Skilled in deep learning, time-series forecasting (LSTM, ARIMA), and building end-to-end data pipelines.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <GraduationCap size={24} />
                <h3 className="text-lg font-semibold text-slate-800">Eğitim</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li>
                  <strong className="block text-slate-800">Haliç University</strong>
                  <span className="text-slate-500 text-xs">Full Scholarship | Sept. 2022 – Jun. 2026</span>
                  <p className="mt-1">Bachelor of Engineering in Computer Engineering</p>
                </li>
                <li>
                  <strong className="block text-slate-800">Google AI and Technology Academy</strong>
                  <span className="text-slate-500 text-xs">Dec. 2024 – Jun. 2025</span>
                  <p className="mt-1">AI and Data Science-focused program</p>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <BrainCircuit size={24} />
                <h3 className="text-lg font-semibold text-slate-800">Deneyim</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li>
                  <strong className="block text-slate-800">TÜBİTAK Research Scholar (1001)</strong>
                  <span className="text-slate-500 text-xs">Yıldız Technical University | Oct. 2025 – Present</span>
                  <p className="mt-1">Developing hybrid time-series architectures (LSTM/ARIMA) analyzing chaotic behavior in seismic activities. Processing large-scale AFAD datasets for AI-driven earthquake risk assessment.</p>
                </li>
                <li>
                  <strong className="block text-slate-800">Telenity - AI & Data Engineering Intern</strong>
                  <span className="text-slate-500 text-xs">Haziran 2025 – Ağustos 2025</span>
                  <div className="mt-1 space-y-1">
                    <p>• Confluence API ve NLP ile 17.000+ sayfalık doküman analiz sistemi kuruldu, HTML raporları üretildi.</p>
                    <p>• BERT modellerine fine-tuning yapılarak Arapça SMS spam dedektörü oluşturuldu ve Google Translate API ile veri artırımı (data augmentation) uygulandı.</p>
                    <p>• K-Means kümeleme metodu ile kullanıcı segmentasyonu yapılıp Öneri Motoru (Recommendation Engine) inşasına katkı sağlandı.</p>
                    <p>• 300 binden fazla satırlı Olay Veri Kayıtlarını (EDR) okuyarak ETL pipeline'ları tasarlanıp Optimum Zaman Tahmini (OTP) modelleri kuruldu.</p>
                    <p>• 1 milyar aboneye hizmet veren 5G-ready telekom platformlarında büyük veri işleme ve gerçek zamanlı yetenekler edinildi.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Technical Skills */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-orange-600">
              <Code size={24} />
              <h3 className="text-lg font-semibold text-slate-800">Yetenekler</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-700">Diller:</strong> Python, Java, SQL, JS
              </div>
              <div>
                <strong className="text-slate-700">Machine Learning & AI:</strong> LightGBM, TensorFlow, Keras, Scikit-learn, BERT, LSTM, ARIMA, RAG
              </div>
              <div>
                <strong className="text-slate-700">Data Engineering:</strong> Pandas, NumPy, PySpark, ETL Pipelines
              </div>
              <div>
                <strong className="text-slate-700">Web & Araçlar:</strong> FastAPI, Web Scraping, Git, SQLite, Docker
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
