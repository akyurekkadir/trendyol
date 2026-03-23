import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, Box, Brain, TrendingUp, MonitorSmartphone, GraduationCap, Briefcase, Globe, Trophy, Activity, Medal, Star, Linkedin, Github, BookOpen, Mail, Phone, Code, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Trendyol() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [pathData, setPathData] = useState("");

  const slides = [
    {
      img: './trendyol_gezi.jpg',
      text: 'Merhaba Trendyol Ekibi'
    },
    {
      img: './haier_odul.png',
      text: 'Haier Europe Datathon 2.lik Ödülü!'
    }
  ];

  useEffect(() => {
    if (activeTab !== 'home') return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeTab, slides.length]);

  // Timeline Nodes Data
  const timelineNodes = [
    { id: 'c0', year: '2003', emoji: '👶', title: 'Doğum' },
    { id: 'c1', year: '2022', emoji: '🎓', title: 'Haliç Üni.' },
    { id: 'c2', year: '2024', emoji: '🏆', title: 'YZTA Datathon\\n& Bursiyer' },
    { id: 'c3', year: '2025', emoji: '🏦', title: 'DenizBank Stajı' },
    { id: 'c4', year: 'Haz. 2025', emoji: '💼', title: 'Telenity Stajı' },
    { id: 'c5', year: 'Eki. 2025', emoji: '🧪', title: 'TÜBİTAK Projesi' },
    { id: 'c6', year: 'Ara. 2025', emoji: '🤝', title: 'Meet & Connect' },
    { id: 'c7', year: 'Kas. 2025', emoji: '🥈', title: 'Haier 2.lik' },
    { id: 'c8', year: '2026', emoji: '🚀', title: 'Trendyol Talent', special: true }
  ];

  // Visual order for the 3x3 grid (snaking arrangement on CSS grid)
  const gridRenderOrder = [
    timelineNodes[0], timelineNodes[1], timelineNodes[2], // Row 1: c0(L) -> c1(M) -> c2(R)
    timelineNodes[5], timelineNodes[4], timelineNodes[3], // Row 2: c5(L) <- c4(M) <- c3(R)
    timelineNodes[6], timelineNodes[7], timelineNodes[8], // Row 3: c6(L) -> c7(M) -> c8(R)
  ];

  const drawLine = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const getCenter = (nodeId) => {
      const el = nodeRefs.current[nodeId];
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    };

    const points = timelineNodes.map(node => getCenter(node.id));
    if (points.some(p => p.x === 0 && p.y === 0)) return;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const A = points[i];
      const B = points[i + 1];

      const isVerticalDrop = Math.abs(A.x - B.x) < 20;

      if (isVerticalDrop) {
        // It's a vertical U-Turn curve at the edges
        const isRightEdge = A.x > containerRect.width / 2;
        const bulge = isRightEdge ? 80 : -80;
        d += ` C ${A.x + bulge} ${A.y}, ${B.x + bulge} ${B.y}, ${B.x} ${B.y}`;
      } else {
        // Horizontal zigzag using default formula requested
        const midX = (A.x + B.x) / 2;
        d += ` C ${midX} ${A.y}, ${midX} ${B.y}, ${B.x} ${B.y}`;
      }
    }
    setPathData(d);
  };

  useEffect(() => {
    if (activeTab === 'home') {
      const timeoutId = setTimeout(drawLine, 120);
      window.addEventListener('resize', drawLine);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', drawLine);
      };
    }
  }, [activeTab]);

  const CATEGORIES = [
    { id: 'kariyer', label: 'Kariyer' },
    { id: 'projeler', label: 'Projeler' },
    { id: 'yetenekler', label: 'Yetenekler' },
    { id: 'sertifikalar', label: 'Sertifikalar' },
    { id: 'iletisim', label: 'İletişim' },
  ];

  const handleTabClick = (e, catId) => {
    e.preventDefault();
    setActiveTab(catId);
  };

  const renderCategoryContent = () => {
    let items = [];
    if (activeTab === 'projeler') {
      items = [
        { title: 'Haier Demand Forecasting', desc: 'Datathon 2.lik Ödülü', icon: TrendingUp, tag: 'Takım Projesi', badge: 'ÖDÜLLÜ', detail: 'Tweedie ve MAE kayıp fonksiyonlarını birleştirerek sıfır ağırlıklı SKU geçişlerini optimize eden 12 aylık talep tahmin modeli. 74 takım arasından 2.lik ödülü kazanıldı.', links: [{ text: 'LinkedIn Gönderisi', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7417624772433502208/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzlRncByKGRBJ1JWPqyPmib6laaGMEX5gw' }] },
        { title: 'Market Product Price Prediction', desc: 'Google AI Akademi Datathon', icon: Brain, tag: 'Bireysel Proje', badge: 'TOP 10', detail: 'Keras ve TensorFlow ile 200.000 veri üzerinden 45.000 farklı ürün için fiyat tahmin modeli. Optimizasyon teknikleri sayesinde 135 takım arasında ilk 10.', links: [{ text: 'GitHub', url: 'https://github.com/akyurekkadir/yzta-datathon' }] },
        { title: 'Virtual Try-On Studio', desc: 'ComfyUI & Derin Öğrenme Tabanlı', icon: MonitorSmartphone, tag: 'Yapay Zeka', badge: 'AR/VR', detail: 'PyTorch ve Stable Diffusion ile tasarlanan, ComfyUI mimarisi kullanılarak kişinin pozisyonunu ve dokuyu bozmadan kıyafet deneme deneyimi sunan gelişmiş sistem.', links: [{ text: 'GitHub', url: 'https://github.com/akyurekkadir/virtual-tryon-studio' }, { text: 'YouTube', url: 'https://youtu.be/mclvx8pwn74' }] },
        { title: 'IoT Smart Fridge', desc: 'Computer Vision ile Tüketim Takibi', icon: Box, tag: 'Simülasyon', badge: 'IoT', detail: 'OpenCV kullanılarak dolaptaki meyvelerin (elma, portakal vb.) durumunu (taze mi, çürük mü) tespit eden ve alışveriş listesi çıkaran yapay zeka destekli akıllı dolap sanal simülasyonu.', links: [{ text: 'GitHub', url: 'https://github.com/akyurekkadir/iot-smart-fridge' }, { text: 'YouTube', url: 'https://youtu.be/3ElFaKVzq6I' }] },
      ];
    } else if (activeTab === 'yetenekler') {
      items = [
        { title: 'Programlama Dilleri', desc: 'Python, Java, JavaScript, SQL', icon: Code, tag: 'Core', badge: 'DİLLER', detail: 'Python ile gelişmiş veri analizi ve ML, Java ile object-oriented tasarımlar, SQL ile veritabanı sorgulama yetkinlikleri.' },
        { title: 'Makine Öğrenimi & AI', desc: 'TensorFlow, Keras, LightGBM, NLP (BERT)', icon: Brain, tag: 'Machine Learning', badge: 'YAPAY ZEKA', detail: 'LightGBM, XGBoost, TensorFlow ve Keras gibi kütüphanelerle Classification, Regression. BERT modelleriyle Arabic ve Türkçe metin analizleri.' },
        { title: 'Zaman Serileri', desc: 'LSTM, ARIMA, Demand Forecasting', icon: Activity, tag: 'Time-Series', badge: 'ANALİZ', detail: 'Haier Datathonu ve TÜBİTAK sismik tahmin projelerinde başarıya ulaşmış güçlü Lineer ve Non-lineer zaman serisi analizi uzmanlığı.' },
        { title: 'Veri & Web Teknolojileri', desc: 'Pandas, PySpark, FastAPI, React', icon: Globe, tag: 'Data Engineering', badge: 'PIPELINE', detail: 'Büyük veri işleme (PySpark, Pandas) analiz süreçleri. API entegrasyonu (FastAPI) ve Full-stack Web entegrasyonları.' },
      ];
    } else if (activeTab === 'sertifikalar') {
      items = [
        { title: 'Google Advanced Data Analytics', desc: 'Google Profosyonel Sertifika Programı', icon: Star, tag: 'Veri Bilimi', badge: 'GOOGLE', detail: 'İstatistik, regresyon ve tahminsel modelleme konularını barındıran kapsamlı 8 kredilik profesyonel eğitim. Python ile baştan sonra ML.' },
        { title: 'Huawei Cloud AI Bootcamp', desc: 'ModelArts ve Cloud Tabanlı Eğitim', icon: Activity, tag: 'Cloud', badge: 'HUAWEI', detail: 'Cloud üzerinde LLM ince-ayarı (fine-tuning) ve RAG mimarilerinin Elasticsearch üzerinden sisteme adaptasyon uygulamaları.' },
        { title: 'Digital Leadership Program', desc: 'Galatasaray & Boğaziçi Üniversitesi', icon: Trophy, tag: 'Liderlik', badge: 'SERTİFİKA', detail: 'Dijital inovasyon, büyük ekiplerde kariyer vizyonu ve rekabetçi stratejileri de içeren ileri düzey liderlik eğitimi.' }
      ];
    } else if (activeTab === 'kariyer') {
      items = [
        { title: 'TÜBİTAK Research Scholar (1001)', desc: 'SismoKaos Deprem Tahmini - Yıldız Teknik', icon: GraduationCap, tag: 'Akademik Araştırma', badge: 'DEVAM EDİYOR', detail: 'Derin öğrenme (LSTM) ve istatistiksel (ARIMA) modellerini karma birleştirerek sismik verilerden deprem stresi ve tahmini sağlayan AFAD destekli araştırma projesi (124E277).' },
        { title: 'Telenity AI & Data Engineering Intern', desc: 'Otomatik Doküman Analitiği ve NLP', icon: Briefcase, tag: 'Yaz Stajı', badge: 'STAJ', detail: '• Confluence API ve NLP ile 17.000+ sayfalık veri analiz sistemi kuruldu.\n• Arapça SMS spam tespiti için BERT modelleri ile veri artırımı yapıldı.\n• K-Means ile kullanıcı segmentasyonu yapılarak Öneri Motoru geliştirilmesine katkı sağlandı.\n• 300.000+ EDR verisini işleyen ETL pipeline\'ları tasarlanıp Optimum Zaman Tahmini (OTP) modelleri kuruldu.\n• 1 milyar+ aboneye hizmet veren 5G-ready telekom platformlarında büyük veri analitiği tecrübesi edinildi.' },
        { title: 'DenizBank Denizaşırı Programı', desc: 'Merkezi Finans ve Kişisel Gelişim Eğitimleri', icon: Globe, tag: 'Eğitim / Teknoloji', badge: 'FİNANS', detail: 'Kişisel gelişim modülleri ve finans sektörünün teknik donanımlarını tanıma amacıyla gerçekleştirilmiş özel seçilmiş adaylar programı.' }
      ];
    } else if (activeTab === 'iletisim') {
      items = [
        { title: 'LinkedIn Bağlantısı', desc: 'Profesyonel Ağım: kadir-akyürek', icon: Linkedin, tag: 'Bağlantı', link: 'https://www.linkedin.com/in/kadir-akyürek-847199246' },
        { title: 'GitHub Profilim', desc: 'Açık Kaynak Projelerim: @akyurekkadir', icon: Github, tag: 'Repo', link: 'https://github.com/akyurekkadir' },
        { title: 'Kaggle Profilim', desc: 'Datathon Verilerim: @c0decad0', icon: BookOpen, tag: 'Model', link: 'https://www.kaggle.com/c0decad0' },
        { title: 'HuggingFace', desc: 'Büyük Dil Modellerim: @akyurekkadir', icon: User, tag: 'AI Depo', link: 'https://huggingface.co/akyurekkadir' },
        { title: 'E-Posta Gönder', desc: 'kadirakyurek353@gmail.com', icon: Mail, tag: 'İletişim', link: 'mailto:kadirakyurek353@gmail.com' },
        { title: 'Arama Yap', desc: 'Telefon numaram: 0536 226 7747', icon: Phone, tag: 'İletişim', link: 'tel:+905362267747' },
      ];
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-gray-500 w-full min-h-[50vh]">
          <Box size={64} className="mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold mb-2">Bu Kategori Şimdilik Boş</h2>
          <p>Çok yakında güncellenecektir.</p>
        </div>
      );
    }

    return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-8 w-full min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{CATEGORIES.find(c => c.id === activeTab)?.label} Detayları</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (item.link) {
                  window.open(item.link, '_blank');
                } else {
                  setSelectedProduct(item);
                }
              }}
              className="bg-white rounded-xl border border-gray-100 hover:border-[#FF6600]/50 p-5 hover:shadow-[0_8px_16px_rgba(255,102,0,0.12)] transition-all duration-300 group cursor-pointer relative flex flex-col h-full"
            >
              {item.badge && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                  {item.badge}
                </span>
              )}

              <div className="w-full aspect-square bg-[#fff5f0] border border-[#ffe0cc] rounded-lg mb-4 flex items-center justify-center p-4">
                {item.icon ? (
                  <item.icon size={64} className="text-[#FF6600] group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300" strokeWidth={1.2} />
                ) : (
                  <Code size={64} className="text-[#FF6600]" strokeWidth={1.5} />
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-sm text-gray-800 leading-tight mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-grow">{item.desc}</p>
                <div className="mt-3 text-gray-400 font-medium text-xs bg-gray-50 w-fit px-2 py-1 rounded border border-gray-100">{item.tag}</div>
                <button className="w-full mt-4 bg-[#FF6600]/10 text-[#FF6600] font-bold text-xs py-2.5 rounded-lg group-hover:bg-[#FF6600] group-hover:text-white transition-colors duration-300">
                  {item.link ? 'Bağlantıya Git' : 'Detayları Gör'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f2f2f2] font-sans selection:bg-[#FF6600] selection:text-white relative overflow-hidden">

      {/* Detail Overlay Modal */}
      {selectedProduct && (
        <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl flex flex-col md:flex-row gap-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#FF6600] bg-gray-100 hover:bg-orange-50 rounded-full p-2 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/3 aspect-square bg-[#fff5f0] border-2 border-[#ffe0cc] rounded-xl flex items-center justify-center p-6 shadow-inner">
              {selectedProduct.icon && <selectedProduct.icon size={80} className="text-[#FF6600] drop-shadow-md" strokeWidth={1} />}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {selectedProduct.badge && (
                <span className="bg-[#FF6600] text-white w-fit text-[10px] font-bold px-3 py-1.5 rounded-md mb-4 tracking-wider uppercase shadow-sm">
                  {selectedProduct.badge}
                </span>
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{selectedProduct.title}</h2>
              <p className="text-gray-400 font-semibold text-sm mb-4 uppercase tracking-wide">{selectedProduct.desc}</p>

              <div className="space-y-4 text-gray-600 text-sm flex-1">
                <p className="leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 font-medium whitespace-pre-line">{selectedProduct.detail}</p>
              </div>

              <div className="mt-8 flex gap-3 flex-wrap">
                <button onClick={() => setSelectedProduct(null)} className="flex-1 bg-[#FF6600] hover:bg-[#E55C00] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center">
                  İncelemeyi Bitir
                </button>
                {selectedProduct.links && selectedProduct.links.map((lnk, idx) => (
                  <button
                    key={idx}
                    onClick={() => window.open(lnk.url, '_blank')}
                    className="px-6 py-3.5 bg-gray-900 border border-gray-800 text-white font-semibold rounded-xl hover:bg-black transition-colors shadow-sm active:scale-95"
                  >
                    {lnk.text}
                  </button>
                ))}
                <button className="p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-400 transition-colors shadow-sm active:scale-95">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trendyol Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all duration-300 w-full">
        <div className="hidden md:flex justify-end gap-6 text-[11px] text-[#666] px-8 py-1.5 border-b border-gray-100 font-medium">
          <a href="#" className="hover:text-[#FF6600] transition-colors">İndirim Kuponlarım</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors">Trendyol'da Satıcı Ol</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors">Yardım & Destek</a>
        </div>

        <div className="flex items-center justify-between px-4 md:px-8 py-3 lg:py-4 gap-4 lg:gap-8 max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <Menu className="lg:hidden text-gray-700" size={24} />
            <span className="text-2xl lg:text-3xl font-black tracking-[-1.5px] text-[#F27A1A] leading-none select-none -translate-y-[2px]">trendyol</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-3xl relative">
            <input
              type="text"
              placeholder="Aradığınız CV özelliklerini yazınız (örn: Machine Learning, React, English...)"
              className="w-full bg-[#f3f3f3] text-[#333] text-sm px-4 py-2.5 rounded-md border-2 border-transparent focus:border-[#FF6600] focus:bg-white focus:outline-none transition-all placeholder-gray-400 font-medium"
            />
            <Search className="absolute right-3 top-2.5 text-[#FF6600]" size={20} />
          </div>

          <div className="flex items-center gap-2 lg:gap-6 text-xs font-semibold text-gray-700">
            <div className="hidden lg:flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#FF6600] group">
              <User size={18} className="group-hover:fill-[#FF6600]/10" />
              <span>Giriş Yap</span>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#FF6600] group">
              <Heart size={18} className="group-hover:fill-[#FF6600]/10" />
              <span>Favorilerim</span>
            </div>
            <div
              className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#FF6600] relative group ${activeTab === 'cart' ? 'text-[#FF6600]' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              <div className="relative">
                <ShoppingCart size={18} className={activeTab === 'cart' ? 'fill-[#FF6600]/10' : 'group-hover:fill-[#FF6600]/10'} />
                <span className="absolute -top-2 -right-2 bg-[#FF6600] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">1</span>
              </div>
              <span className="hidden lg:block">Sepetim</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center gap-10 py-3 text-sm font-semibold text-[#333] border-t border-gray-100">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={(e) => handleTabClick(e, cat.id)}
              className={`hover:text-[#FF6600] cursor-pointer pb-1 transition-all ${activeTab === cat.id ? 'text-[#FF6600] border-b-2 border-[#FF6600]' : 'border-b-2 border-transparent'}`}
            >
              {cat.label}
            </div>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto w-full relative">
        {activeTab === 'home' ? (
          <div className="w-full h-full pb-32">

            {/* Full-width Hero Banner & Slider Section */}
            <div className="w-full relative bg-gray-900 md:aspect-[21/9] aspect-video max-h-[600px] overflow-hidden group">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <img src={slide.img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover object-center" />

                  {/* Decorative Gradient Overlay for pure transparent text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent flex flex-col justify-end p-6 md:p-12">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-2 md:mb-4 tracking-tight drop-shadow-xl select-text opacity-95">
                      {slide.text}
                    </h1>
                  </div>
                </div>
              ))}

              {/* Slider Controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-[#FF6600] text-white rounded-full flex justify-center items-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronLeft size={32} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-[#FF6600] text-white rounded-full flex justify-center items-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronRight size={32} strokeWidth={2.5} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#FF6600] w-10' : 'bg-white/60 hover:bg-white w-2.5'}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full mx-auto px-4 py-12 flex flex-col items-center overflow-hidden bg-[#F5F5F5]">

              {/* Professional Note */}
              <div className="bg-white/60 backdrop-blur-sm border border-[#FF6600]/20 max-w-4xl p-8 rounded-2xl shadow-sm mb-16 text-center mt-4">
                <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed italic">
                  "Meet and Connect etkinliği benim için çok verimliydi. Trendyol gibi teknoloji odaklı bir şirkette stajyer olarak çalışmayı ve bu ekibin bir parçası olmayı çok istiyorum."
                </p>
                <div className="mt-6 flex justify-center gap-2 text-[#FF6600]">
                  <Heart size={24} fill="currentColor" />
                  <Heart size={24} fill="currentColor" />
                  <Heart size={24} fill="currentColor" />
                </div>
              </div>

              {/* Timeline Section */}
              <section className="w-full max-w-[900px] pt-4 pb-32">
                <h2 className="text-[22px] font-medium text-[#FF6B35] mb-16 text-center">2003 and Beyond: A Journey into the Future</h2>

                <div ref={containerRef} className="relative w-full">
                  {/* Absolute SVG for snake path */}
                  <svg className="absolute inset-0 w-full pointer-events-none" style={{ height: '100%', minHeight: '600px', overflow: 'visible', zIndex: 0 }}>
                    <defs>
                      <filter id="neonGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background Soft Halo Line */}
                    {pathData && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="7"
                        strokeOpacity="0.15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {/* Foreground Glowing Dashed Neon Line */}
                    {pathData && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="2.5"
                        strokeDasharray="8 5"
                        strokeOpacity="0.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#neonGlow)"
                      />
                    )}
                  </svg>

                  {/* Nodes Grid */}
                  <div className="grid grid-cols-3 gap-y-24 gap-x-10 w-full relative z-10">
                    {gridRenderOrder.map((node) => (
                      <div key={node.id} className="flex justify-center items-center">
                        <div
                          ref={el => nodeRefs.current[node.id] = el}
                          className="w-[110px] h-[110px] rounded-full bg-white flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 cursor-default"
                          style={{
                            border: `4px solid ${node.special ? 'rgba(255,107,53,0.5)' : '#FF6B35'}`,
                            borderStyle: node.special ? 'dashed' : 'solid',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 18px 4px rgba(255,107,53,0.35)';
                            e.currentTarget.style.transform = 'scale(1.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-[#FF6B35] text-[11px] font-bold mb-1 tracking-wide">{node.year}</span>
                          <span className="text-[20px] mb-1">{node.emoji}</span>
                          <span className="text-[10.5px] font-bold text-gray-800 text-center px-2" style={{ lineHeight: '1.3', whiteSpace: 'pre-line' }}>{node.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </div>
          </div>
        ) : activeTab === 'cart' ? (
          <div className="w-full min-h-full bg-[#f2f2f2] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sepetim (1 Öğrenci)</h1>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#FF6600] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                      TALEBİ ALINDI
                    </div>

                    <div className="flex gap-4">
                      {/* Cart Image Replaced with Icon instead of Folder */}
                      <div className="w-24 h-24 border border-[#ffe0cc] rounded-lg p-2 flex items-center justify-center bg-[#fff5f0] shadow-sm">
                        <Brain size={54} className="text-[#FF6600]" strokeWidth={1.2} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-[#333] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Trendyol Tech</span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mt-1">Trendyol Talent Program 2026 - Data Scientist</h3>
                          <p className="text-xs text-gray-500 mt-1"><span className="font-semibold text-gray-700">Aday:</span> Kadir Akyürek</p>
                          <p className="text-xs font-semibold text-green-600 mt-2 bg-green-50 w-fit px-2 py-1 rounded border border-green-100">Durumu: Onay Bekliyor</p>
                          <p className="text-xs font-medium text-orange-600 mt-2 bg-orange-50 w-fit px-2 py-1 flex items-center gap-1 rounded border border-orange-100">
                            <Box size={14} /> Tahmini Teslimat: 1 Haziran 2026
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Önceki Siparişlerim</h3>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 border border-gray-100 rounded-lg p-2 flex items-center justify-center bg-gray-50 opacity-80">
                        <Heart size={40} className="text-[#FF6600]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-semibold text-gray-800">Trendyol Meet and Connect Etkinliği</h4>
                        <p className="text-[11px] text-gray-500 mt-1"><span className="font-semibold">Katılımcı:</span> Kadir Akyürek</p>
                        <p className="text-xs font-semibold text-gray-600 mt-2 bg-gray-100 border border-gray-200 w-fit px-2 py-1 rounded">Teslim Edildi: 5 Aralık 2025</p>

                        <button onClick={() => setShowReview(!showReview)} className="mt-3 text-xs font-bold text-[#FF6600] w-fit hover:underline focus:outline-none">
                          {showReview ? 'Değerlendirmemi Gizle' : 'Değerlendirmemi Gör'}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Review Section */}
                    {showReview && (
                      <div className="mt-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-[#F27A1A]">
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                          </div>
                          <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">Onaylı Alıcı</span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium italic leading-relaxed">
                          "Benim için çok güzel bir deneyimdi tüm ekibe teşekkür ederim."
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-[320px]">
                  <div className="bg-white rounded-lg border border-[#FF6600] shadow-md p-6 sticky top-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Sipariş Özeti</h3>

                    <div className="space-y-4 mb-6 text-sm text-gray-600">
                      <div className="flex justify-between items-center text-[#FF6600] font-medium">
                        <span>Yetenek İndirimi</span>
                        <span>-100% Limitless</span>
                      </div>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                        <span>Süreç Bedeli</span>
                        <span className="text-[#FF6600] text-base">Mülakat Aşamaları</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Harika! CV'mi incelediğiniz için teşekkür ederim. - Kadir")}
                      className="w-full bg-[#FF6600] hover:bg-[#E55C00] text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Sepeti Onayla <span className="text-lg">›</span>
                    </button>

                    <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-500 font-medium">
                      <p>Siparişiniz 1 Haziran 2026'da staja başlayacak şekilde planlanmıştır.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderCategoryContent()
        )}
      </div>
    </div>
  );
}
