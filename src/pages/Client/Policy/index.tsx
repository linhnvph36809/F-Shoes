import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Policy = () => {
    const [openSections, setOpenSections] = useState([true, false, false, false]);

    const toggleSection = (index: any) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg p-6">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">📜 Chính Sách / Nội Quy</h1>

                {/* Accordion Section */}
                <div className="space-y-4">
                    {/* Section 1 */}
                    <div className={`border rounded-lg shadow-sm ${openSections[0] ? 'bg-blue-50' : 'bg-white'}`}>
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleSection(0)}
                        >
                            <h2 className="text-lg font-bold text-gray-800">1. Mục đích</h2>
                            {openSections[0] ? (
                                <FaChevronUp className="text-gray-600" />
                            ) : (
                                <FaChevronDown className="text-gray-600" />
                            )}
                        </div>
                        {openSections[0] && (
                            <div className="p-4 text-gray-600">
                                Chính sách này nhằm đảm bảo mọi người tuân thủ các quy định và hành xử đúng mực trong
                                môi trường làm việc/chung.
                            </div>
                        )}
                    </div>

                    {/* Section 2 */}
                    <div className={`border rounded-lg shadow-sm ${openSections[1] ? 'bg-blue-50' : 'bg-white'}`}>
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleSection(1)}
                        >
                            <h2 className="text-lg font-bold text-gray-800">2. Quy định chung</h2>
                            {openSections[1] ? (
                                <FaChevronUp className="text-gray-600" />
                            ) : (
                                <FaChevronDown className="text-gray-600" />
                            )}
                        </div>
                        {openSections[1] && (
                            <div className="p-4 text-gray-600 space-y-2">
                                <ul className="list-disc pl-6">
                                    <li>Tuân thủ các quy định về giờ giấc.</li>
                                    <li>Không sử dụng ngôn từ thô tục hoặc xúc phạm người khác.</li>
                                    <li>Bảo quản tài sản chung của tập thể.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Section 3 */}
                    <div className={`border rounded-lg shadow-sm ${openSections[2] ? 'bg-blue-50' : 'bg-white'}`}>
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleSection(2)}
                        >
                            <h2 className="text-lg font-bold text-gray-800">3. Trả hàng</h2>
                            {openSections[2] ? (
                                <FaChevronUp className="text-gray-600" />
                            ) : (
                                <FaChevronDown className="text-gray-600" />
                            )}
                        </div>
                        {openSections[2] && (
                            <div className="p-4 text-gray-600">
                                Nếu có sự thắc mắc vui lòng liên hệ qua
                                <br /> Hotline: 0989329401 & 0337462004
                                <br /> Email: thainguyen2662004@gmail.com & luongnm1124@gmail.com
                            </div>
                        )}
                    </div>

                    {/* Section 4 */}
                    <div className={`border rounded-lg shadow-sm ${openSections[3] ? 'bg-blue-50' : 'bg-white'}`}>
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleSection(3)}
                        >
                            <h2 className="text-lg font-bold text-gray-800">4. Thời gian hiệu lực</h2>
                            {openSections[3] ? (
                                <FaChevronUp className="text-gray-600" />
                            ) : (
                                <FaChevronDown className="text-gray-600" />
                            )}
                        </div>
                        {openSections[3] && (
                            <div className="p-4 text-gray-600">
                                Chính sách này có hiệu lực từ ngày{' '}
                                <span className="font-medium text-blue-600">01/01/2025</span> và được áp dụng đến khi có
                                thông báo mới.
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-sm text-gray-500 mt-8">
                    © 2025 Công ty/Đơn vị của bạn. Mọi quyền được bảo lưu.
                </footer>
            </div>
        </div>
    );
};

export default Policy;
