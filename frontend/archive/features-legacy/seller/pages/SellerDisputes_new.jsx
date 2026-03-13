import { useState } from 'react';
import { AlertTriangle, Filter, MessageSquare, FileText, CheckCircle, Clock } from 'lucide-react';
import Footer from '../../../components/layout/Footer';

const SellerDisputes = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState(null);

  const disputes = [
    {
      id: 1,
      disputeNum: '#DSP-001',
      orderId: '#ORD-2451',
      customer: 'Ahmed Hassan',
      reason: 'Product not as described',
      amount: '$89.99',
      status: 'open',
      date: '2024-01-23',
      message: 'The color is different from the picture',
      evidence: ['photo1.jpg', 'photo2.jpg']
    },
    {
      id: 2,
      disputeNum: '#DSP-002',
      orderId: '#ORD-2445',
      customer: 'Fatima Ali',
      reason: 'Item missing',
      amount: '$45.50',
      status: 'in_review',
      date: '2024-01-20',
      message: 'I only received 1 item instead of 2',
      evidence: []
    },
    {
      id: 3,
      disputeNum: '#DSP-003',
      orderId: '#ORD-2440',
      customer: 'Mohamed Ibrahim',
      reason: 'Damaged item',
      amount: '$125.00',
      status: 'resolved',
      date: '2024-01-18',
      message: 'Item arrived with broken screen',
      evidence: ['damage_photo.jpg']
    },
    {
      id: 4,
      disputeNum: '#DSP-004',
      orderId: '#ORD-2435',
      customer: 'Sara Khan',
      reason: 'Late delivery',
      amount: '$67.80',
      status: 'open',
      date: '2024-01-15',
      message: 'Expected delivery was 5 days ago',
      evidence: []
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-red-900 text-red-200 border-red-700';
      case 'in_review': return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      case 'resolved': return 'bg-green-900 text-green-200 border-green-700';
      default: return 'bg-gray-700 text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in_review': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredDisputes = filterStatus === 'all' - disputes : disputes.filter(d => d.status === filterStatus);

  return (
    <div className=\"bg-gray-900 min-h-screen text-white\">\n      <div className=\"p-8\">\n        <div className=\"flex justify-between items-center mb-8\">\n          <div>\n            <h1 className=\"text-4xl font-bold mb-2\">Disputes</h1>\n            <p className=\"text-gray-400\">Manage customer disputes and resolutions</p>\n          </div>\n          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className=\"px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2\">\n            <option value=\"all\">All Disputes</option>\n            <option value=\"open\">Open</option>\n            <option value=\"in_review\">In Review</option>\n            <option value=\"resolved\">Resolved</option>\n          </select>\n        </div>\n\n        <div className=\"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8\">\n          <div className=\"bg-zinc-900 rounded-lg p-6 border border-zinc-800\">\n            <p className=\"text-gray-400 text-sm mb-2\">Total Disputes</p>\n            <p className=\"text-3xl font-bold\">{disputes.length}</p>\n          </div>\n          <div className=\"bg-zinc-900 rounded-lg p-6 border border-zinc-800\">\n            <p className=\"text-gray-400 text-sm mb-2\">Open</p>\n            <p className=\"text-3xl font-bold text-red-400\">{disputes.filter(d => d.status === 'open').length}</p>\n          </div>\n          <div className=\"bg-zinc-900 rounded-lg p-6 border border-zinc-800\">\n            <p className=\"text-gray-400 text-sm mb-2\">In Review</p>\n            <p className=\"text-3xl font-bold text-yellow-400\">{disputes.filter(d => d.status === 'in_review').length}</p>\n          </div>\n          <div className=\"bg-zinc-900 rounded-lg p-6 border border-zinc-800\">\n            <p className=\"text-gray-400 text-sm mb-2\">Resolved</p>\n            <p className=\"text-3xl font-bold text-green-400\">{disputes.filter(d => d.status === 'resolved').length}</p>\n          </div>\n        </div>\n\n        <div className=\"space-y-4\">\n          {filteredDisputes.map((dispute) => (\n            <div key={dispute.id} onClick={() => setSelectedDispute(dispute)} className=\"bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 cursor-pointer transition\">\n              <div className=\"flex justify-between items-start mb-4\">\n                <div className=\"flex-1\">\n                  <div className=\"flex items-center gap-3\">\n                    <h3 className=\"text-lg font-bold\">{dispute.disputeNum}</h3>\n                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(dispute.status)}`}>\n                      {getStatusIcon(dispute.status)} {dispute.status}\n                    </span>\n                  </div>\n                  <p className=\"text-gray-400 text-sm mt-1\">{dispute.customer} - Order {dispute.orderId} - {dispute.date}</p>\n                </div>\n                <p className=\"text-2xl font-bold\">{dispute.amount}</p>\n              </div>\n\n              <div className=\"bg-gray-800 rounded p-3 mb-4\">\n                <p className=\"text-sm font-semibold mb-1\">Reason: {dispute.reason}</p>\n                <p className=\"text-sm text-gray-300 line-clamp-2\">{dispute.message}</p>\n              </div>\n\n              {dispute.evidence.length > 0 && (\n                <div className=\"text-xs text-gray-400 mb-4\">\n                  <FileText className=\"w-4 h-4 inline mr-1\" /> {dispute.evidence.length} file(s)\n                </div>\n              )}\n\n              <button className=\"px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold flex items-center gap-2 transition\">\n                <MessageSquare className=\"w-4 h-4\" /> Respond\n              </button>\n            </div>\n          ))}\n        </div>\n      </div>\n\n      {selectedDispute && (\n        <div className=\"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4\">\n          <div className=\"bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-2xl max-h-96 overflow-y-auto\">\n            <div className=\"sticky top-0 p-6 border-b border-zinc-800 bg-zinc-900 flex justify-between items-start\">\n              <div>\n                <h2 className=\"text-2xl font-bold\">{selectedDispute.disputeNum}</h2>\n                <p className=\"text-gray-400 text-sm mt-1\">{selectedDispute.customer} - {selectedDispute.date}</p>\n              </div>\n              <button onClick={() => setSelectedDispute(null)} className=\"text-gray-400 hover:text-white text-2xl\">x</button>\n            </div>\n\n            <div className=\"p-6 space-y-6\">\n              <div>\n                <h3 className=\"font-semibold mb-2\">Dispute Details</h3>\n                <div className=\"grid grid-cols-2 gap-4 text-sm\">\n                  <div><p className=\"text-gray-400\">Reason</p><p className=\"font-semibold\">{selectedDispute.reason}</p></div>\n                  <div><p className=\"text-gray-400\">Amount</p><p className=\"font-semibold\">{selectedDispute.amount}</p></div>\n                  <div><p className=\"text-gray-400\">Order ID</p><p className=\"font-semibold\">{selectedDispute.orderId}</p></div>\n                  <div><p className=\"text-gray-400\">Status</p><p className={`font-semibold ${selectedDispute.status === 'open' ? 'text-red-400' : selectedDispute.status === 'in_review' ? 'text-yellow-400' : 'text-green-400'}`}>{selectedDispute.status}</p></div>\n                </div>\n              </div>\n\n              <div>\n                <h3 className=\"font-semibold mb-2\">Customer Message</h3>\n                <p className=\"bg-gray-800 rounded p-3 text-sm\">{selectedDispute.message}</p>\n              </div>\n\n              {selectedDispute.evidence.length > 0 && (\n                <div>\n                  <h3 className=\"font-semibold mb-2\">Evidence</h3>\n                  <div className=\"flex gap-2\">\n                    {selectedDispute.evidence.map((file, idx) => (\n                      <div key={idx} className=\"bg-gray-800 rounded p-2 text-xs flex items-center gap-1\">\n                        <FileText className=\"w-4 h-4\" /> {file}\n                      </div>\n                    ))}\n                  </div>\n                </div>\n              )}\n\n              {selectedDispute.status === 'open' && (\n                <div>\n                  <textarea placeholder=\"Type your response here...\" className=\"w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500\" rows=\"3\"></textarea>\n                  <button className=\"mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition\">Submit Response</button>\n                </div>\n              )}\n            </div>\n          </div>\n        </div>\n      )}\n\n      <Footer />\n    </div>\n  );\n};\n\nexport default SellerDisputes;

