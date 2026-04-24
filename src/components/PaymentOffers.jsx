import React, { useState } from 'react';
import { Tag, CheckCircle, Copy, Sparkles } from 'lucide-react';

const paymentOffers = {
  upi: [
    { id: 1, bank: 'Paytm Bank', offer: '10% cashback up to ₹100 on UPI payments', code: 'UPI100' },
    { id: 2, bank: 'Google Pay', offer: 'Flat ₹50 off on orders above ₹500', code: 'G50' },
  ],
  credit_card: [
    { id: 1, bank: 'HDFC Bank', offer: '15% instant discount on HDFC Credit Cards', code: 'HDFC15' },
    { id: 2, bank: 'ICICI Bank', offer: '₹200 off on minimum spend of ₹2000', code: 'ICICI200' },
  ],
  debit_card: [
    { id: 1, bank: 'SBI Bank', offer: '5% cashback on SBI Debit Cards', code: 'SBI5' },
    { id: 2, bank: 'Axis Bank', offer: 'Flat ₹75 off on all Debit Card transactions', code: 'AXIS75' },
  ],
  cash: [],
};

const PaymentOffers = ({ paymentMethod }) => {
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  
  console.log("Payment method received in PaymentOffers:", paymentMethod);
  const offers = paymentOffers[paymentMethod] || [];

  const handleApplyOffer = (offerCode) => {
    console.log(`Offer ${offerCode} applied!`);
    setShowApplySuccess(true);
    setTimeout(() => {
      setShowApplySuccess(false);
    }, 2000);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  if (offers.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-xl font-bold text-white">Available Offers</h4>
      </div>
      
      <div className="space-y-4">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span className="text-white font-bold">{offer.bank}</span>
                </div>
                <p className="text-neutral-300 mb-3">{offer.offer}</p>
                
                {offer.code && (
                  <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-700 rounded-lg px-4 py-2 w-fit">
                    <span className="text-neutral-400 text-sm">Code:</span>
                    <span className="text-orange-400 font-bold text-sm">{offer.code}</span>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="ml-2 p-1 hover:bg-neutral-700 rounded transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === offer.code ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleApplyOffer(offer.code)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Apply Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {showApplySuccess && (
        <div className="mt-4 bg-green-500/20 border border-green-500/40 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          <span className="text-green-300 font-medium">Offer Applied Successfully!</span>
        </div>
      )}
    </div>
  );
};

export default PaymentOffers;