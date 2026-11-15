import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, CheckCircle, Plus } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const { t, reviews, addReview, products, language } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const approvedReviews = reviews.filter(r => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      productId: selectedProduct,
      customerName: name.trim(),
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
    });

    setName('');
    setComment('');
    setModalOpen(false);
  };

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
              {t('testimonialsHeading')}
            </h2>
            <p className="text-stone-500 text-sm mt-1.5">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-stone-300 hover:border-black text-stone-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-[#C4A77D]" />
            <span>{t('writeReview')}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => {
            const productMatch = products.find(p => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="p-6 bg-white rounded-md border border-[#E8E4DA] shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-stone-900">
                      {rev.customerName}
                    </span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  {productMatch && (
                    <span className="text-[11px] text-stone-400 block truncate mt-0.5">
                      {productMatch.name[language]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-1">
              Submit Customer Review
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Share your honest feedback on your ASVORE purchase.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shakil Ahmed"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Product Purchased
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name[language]} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono ml-2 text-stone-600">{rating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the fabric feel, sizing, finish, and delivery..."
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
