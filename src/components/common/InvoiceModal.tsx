import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, X, Download, CheckCircle, Package } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { viewingInvoiceOrder, setViewingInvoiceOrder, formatPrice, settings } = useApp();

  if (!viewingInvoiceOrder) return null;

  const order = viewingInvoiceOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 print:m-0 print:p-0 print:shadow-none print:w-full">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#C4A77D]" />
            <span className="text-sm font-medium tracking-wide">
              Official Tax Invoice & Delivery Memo — {order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C4A77D] hover:bg-[#b09368] text-stone-900 text-xs font-semibold rounded transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setViewingInvoiceOrder(null)}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 md:p-10 text-stone-800 font-sans print:p-6" id="printable-invoice">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-stone-200 gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-black tracking-widest text-stone-950">ASVORE</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-stone-100 text-stone-600 rounded font-semibold border border-stone-200">
                  Luxury Atelier
                </span>
              </div>
              <p className="text-xs text-stone-500 italic mt-0.5">Style Beyond Ordinary</p>
              <p className="text-xs text-stone-600 mt-2 max-w-sm">
                {settings.showroomAddress.en}
              </p>
              <p className="text-xs text-stone-600">
                Hotline: {settings.phone} | Email: {settings.email}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider rounded border border-stone-200 mb-2">
                INVOICE #{order.orderNumber}
              </span>
              <p className="text-xs text-stone-500">
                Issue Date: <span className="font-medium text-stone-800">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
              <p className="text-xs text-stone-500">
                Payment: <span className="font-medium text-stone-800">{order.paymentMethod}</span> ({order.paymentStatus})
              </p>
              <p className="text-xs text-stone-500">
                Status: <span className="font-semibold text-[#8B6E3F]">{order.status}</span>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-stone-200 text-xs">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Billed & Shipped To</h4>
              <p className="font-semibold text-stone-900 text-sm">{order.customer.fullName}</p>
              <p className="text-stone-700 mt-0.5">{order.customer.phone}</p>
              {order.customer.email && <p className="text-stone-700">{order.customer.email}</p>}
              <p className="text-stone-700 mt-1">{order.customer.address}</p>
              <p className="text-stone-700">
                {order.customer.upazila}, {order.customer.district}, {order.customer.division}
                {order.customer.postalCode ? ` - ${order.customer.postalCode}` : ''}
              </p>
              {order.customer.notes && (
                <p className="text-stone-500 italic mt-1.5">Note: {order.customer.notes}</p>
              )}
            </div>

            <div className="sm:text-right">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Dispatch Logistics</h4>
              <p className="text-stone-700">
                Assigned Courier: <span className="font-semibold text-stone-900">{order.courierName || 'Steadfast Courier'}</span>
              </p>
              <p className="text-stone-700 mt-0.5">
                Tracking Ref: <span className="font-mono font-medium text-stone-900">{order.trackingNumber || 'Pending Dispatch'}</span>
              </p>
              <p className="text-stone-700 mt-0.5">
                Estimated Delivery: <span className="font-medium text-stone-900">{order.estimatedDelivery || '24-48 Hours'}</span>
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] rounded border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified ASVORE Authenticity Guarantee</span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="pb-3 w-12 text-center">#</th>
                  <th className="pb-3">Item Description</th>
                  <th className="pb-3 text-center">Size / Spec</th>
                  <th className="pb-3 text-right">Unit Price</th>
                  <th className="pb-3 text-center">Qty</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, index) => (
                  <tr key={index} className="py-3">
                    <td className="py-3 text-center text-stone-400 font-mono">{index + 1}</td>
                    <td className="py-3">
                      <div className="font-medium text-stone-900">{item.name.en}</div>
                      <div className="text-[11px] text-stone-500">{item.category}</div>
                    </td>
                    <td className="py-3 text-center text-stone-700 font-mono">
                      {item.size || 'Standard'} {item.color ? `· ${item.color}` : ''}
                    </td>
                    <td className="py-3 text-right text-stone-700 font-mono">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-3 text-center text-stone-700 font-mono">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right font-semibold text-stone-900 font-mono">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end pt-4 border-t border-stone-200">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-stone-800">{formatPrice(order.subtotal)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <span className="font-mono font-medium">-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge</span>
                <span className="font-mono font-medium text-stone-800">
                  {order.deliveryCharge === 0 ? 'FREE' : formatPrice(order.deliveryCharge)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-300">
                <span>Total Payable</span>
                <span className="font-mono text-base text-[#8B6E3F]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Terms & Return policy */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed">
            <p className="font-semibold text-stone-700 mb-1">Return & Exchange Policy</p>
            <p>
              Thank you for choosing ASVORE. Items may be exchanged within 7 days of delivery in their original unworn condition with tags attached. Please retain this invoice as proof of purchase. For returns or support, message us on WhatsApp at {settings.whatsappNumber}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
