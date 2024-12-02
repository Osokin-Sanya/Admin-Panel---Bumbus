import React from "react";

interface OrderCommentProps {
  commentText: string;
}

const OrderComment: React.FC<OrderCommentProps> = ({ commentText }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Коментар до замовлення
      </h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-base text-gray-700 whitespace-pre-wrap">
          {commentText}
        </p>
      </div>
    </div>
  );
};

export default OrderComment;
