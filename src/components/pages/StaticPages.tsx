import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, Truck, RefreshCw, Send, Check } from 'lucide-react';
import { IMAGES } from '../../assets/images';

export const AboutPage: React.FC = () => {
  const { t, settings, language, setActiveView } = useApp();

  return (
    <div className="bg-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E4DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A6885E] block mb-2">
            THE ATELIER STORY
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Style Beyond Ordinary
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            At ASVORE, we believe style is more than what you wear. It is how you express confidence, dignity, and individuality.
          </p>
        </div>

        {/* Editorial Photo */}
        <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-lg border border-stone-200 mb-12">
          <img
            src={IMAGES.heroFashionEditorial}
            alt="ASVORE Atelier Lookbook"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Founded with the vision to make international-grade menswear and accessories accessible across Bangladesh, <strong>ASVORE</strong> bridges timeless tailoring with contemporary streetwear elegance. From carefully chosen 260 GSM Supima cottons to bespoke semi-silk Panjabis and precision timepieces, every single piece in our collection is curated with meticulous attention to fabric weight, silhouette, and finish.
          </p>

          <p>
            Headquartered in <strong>Gaibandha Sadar</strong> with a nationwide fulfillment network connecting all 64 districts, ASVORE is committed to delivering affordable luxury without compromising on materials or customer service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 not-prose">
            <div className="p-6 bg-white rounded border border-[#E8E4DA] text-center">
              <span className="font-serif-luxury text-3xl font-bold text-stone-900 block mb-1">64</span>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Districts Covered</span>
            </div>
            <div className="p-6 bg-white rounded border border-[#E8E4DA] text-center">
              <span className="font-serif-luxury text-3xl font-bold text-stone-900 block mb-1">100%</span>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Authentic Materials</span>
            </div>
            <div className="p-6 bg-white rounded border border-[#E8E4DA] text-center">
              <span className="font-serif-luxury text-3xl font-bold text-stone-900 block mb-1">24/7</span>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Concierge Support</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveView('catalog')}
            className="px-8 py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded"
          >
            Explore The Collection
          </button>
        </div>

      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { settings, language, notify } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    notify('Thank you! Your message has been received. Our concierge will contact you shortly.', 'success');
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E4DA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A6885E] block mb-2">
            CONCIERGE & SHOWROOM
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
            Connect With ASVORE
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            We are here to assist you with styling recommendations, custom orders, and shipment tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Details */}
          <div className="bg-white p-8 rounded-lg border border-[#E8E4DA] shadow-xs space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              Showroom & Atelier
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A6885E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-stone-900">Showroom Address:</span>
                  <span>{settings.showroomAddress[language]}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#A6885E] shrink-0" />
                <div>
                  <span className="font-semibold block text-stone-900">Phone & WhatsApp:</span>
                  <a href={`tel:${settings.phone}`} className="hover:text-[#A6885E] font-mono">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A6885E] shrink-0" />
                <div>
                  <span className="font-semibold block text-stone-900">Direct Email:</span>
                  <a href={`mailto:${settings.email}`} className="hover:text-[#A6885E]">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <a
                href={`https://wa.me/8801815951971?text=Hello%20ASVORE!%20I%20need%20assistance%20with%20your%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs uppercase tracking-wider font-bold rounded flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-lg border border-[#E8E4DA] shadow-xs">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-4">
              Send a Message
            </h3>

            {sent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Message sent successfully! Our team will respond shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded font-mono focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Inquiry / Question *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with sizing, fabric or delivery?"
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#C4A77D]" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export const PoliciesPage: React.FC = () => {
  return (
    <div className="bg-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E4DA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-1">
            CUSTOMER ASSURANCE
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-stone-900">
            Policies & Service Standards
          </h1>
        </div>

        {/* Delivery Policy */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] space-y-3 text-xs sm:text-sm text-stone-700">
          <h2 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#A6885E]" />
            <span>Delivery Policy</span>
          </h2>
          <p>
            ASVORE provides secure nationwide door-to-door delivery across all 64 districts in Bangladesh through trusted courier partners (Steadfast Courier, RedX, and Pathao).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs">
            <li><strong>Inside Dhaka:</strong> Delivery within 24 to 48 hours (৳60 delivery charge).</li>
            <li><strong>Outside Dhaka:</strong> Delivery within 48 to 72 hours (৳120 delivery charge).</li>
            <li><strong>Free Delivery:</strong> All orders of ৳2,500 and above qualify for 100% Free Nationwide Delivery.</li>
          </ul>
        </div>

        {/* Return & Exchange */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] space-y-3 text-xs sm:text-sm text-stone-700">
          <h2 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#A6885E]" />
            <span>Return & Size Exchange Policy</span>
          </h2>
          <p>
            We want you to feel completely confident in your ASVORE wardrobe. If a shirt, Panjabi, or trouser does not fit as expected:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs">
            <li>Notify us within <strong>7 days</strong> of delivery via WhatsApp or phone.</li>
            <li>The item must remain unworn, unwashed, and in its original luxury packaging with tags intact.</li>
            <li>Size exchanges are dispatched promptly once the returned piece is verified by our atelier.</li>
          </ul>
        </div>

        {/* Privacy & Terms */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] space-y-3 text-xs sm:text-sm text-stone-700">
          <h2 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A6885E]" />
            <span>Privacy & Security</span>
          </h2>
          <p>
            Your phone number, shipping address, and order records are held strictly confidential and used solely for fulfilling your purchase. We do not store payment card information or share client data with third parties.
          </p>
        </div>

      </div>
    </div>
  );
};
