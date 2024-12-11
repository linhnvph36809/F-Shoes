const Header = () => {
  return (
    <div className="bg-black text-white p-6 py-16 flex items-start gap-x-10">
      {' '}
      {/* Giảm padding dọc */}
      <div className="w-5/12">
        <img
          src="https://res.cloudinary.com/dmubfrefi/image/private/s--Y0WMlp47--/c_crop,h_2136,w_3200,x_0,y_394/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/674d10df-6b4b-42af-8785-6793985264fe/2025-ekiden-collection.jpeg?_a=BAAAV6Bs"
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="w-8/12">
        {/* Cột bên trái */}
        <div className="lg:w-1/3 flex flex-col">
          {' '}
          {/* Thêm mt-auto nếu cần */}
          <h1 className="text-white text-15px">31 tháng 10, 2024</h1>
        </div>
        {/* Cột bên phải */}
        <div className="lg:w-2/3">
          {/* Tiêu đề */}
          <h1 className="text-white text-48px font-black ">
            Nike Extends Support for Kenyan Athletes, Providing Emergency Medical and Rescue Services
          </h1>
        </div>
      </div>
    </div>
  );
};

const articles = [
  {
    image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--Y0WMlp47--/c_crop,h_2136,w_3200,x_0,y_394/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/674d10df-6b4b-42af-8785-6793985264fe/2025-ekiden-collection.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
    title: 'Nike Tech Woven Suit Delivers a Premium Update to a Classic Sportswear Staple',
    date: 'October 03, 2024',
  },
  {
    image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--IIOvEpE0--/c_crop,h_1782,w_2676,x_254,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/d242681f-6772-443e-a8d7-4b0cad9ee4bd/alissa-pili-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
    title: 'Nike Vomero Advances Retro Running Style with New Colors and Weatherized Silhouette',
    date: 'October 02, 2024',
  },
  {
    image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--65H3hXEZ--/c_crop,h_1438,w_2158,x_568,y_375/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/ee9ee7ab-d683-48d4-a9c5-ba2ff8811fbf/mds-mercurial-superfly-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
    title: 'Ja Morant’s Second Signature Shoe, the Ja 2, is Built for the Next Generation',
    date: 'September 25, 2024',
  },

  // Thêm các bài viết khác nếu cần
];

const NewsList = () => {
  return (
    <div className="container  px-4 mt-4 bg-gray-100">
      <div className=" flex flex-wrap mx-4 px-4 bg-gray-100">
        {articles.map((article) => (
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white border-none shadow-none overflow-hidden">
              <img alt="example" src={article.image} className="w-full h-[300px] object-cover" />
              <div className="p-4">
                <p className="text-gray-500 text-15px">Release</p>
                <h3 className="text-20px font-bold text-gray-700 mt-2">{article.title}</h3>
                <p className="text-gray-600 text-15px">{article.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
function PostDetail() {
  return (
    <div className="">
      <Header />
      <section className="text-center py-10">Content</section>
      <NewsList />
    </div>
  );
}
export default PostDetail;
