import { Button, Table } from "antd";

const CreateOrder = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name', 
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url', 
        },
        {
            
        }
    ]
    return (
        <div className="bg-white h-full w-full p-8">
           <h3 className="font-bold text-[16px]">
                Create Order
           </h3>
           <div>
                <header className="flex justify-between my-4">
                    <div>
                        đơn hàng
                    </div>
                    <div>
                        <Button>Add Product</Button>
                    </div>
                </header>
                <main className="">
                    <div>Cart</div>
                    <Table/>
                </main>
           </div>
        </div>
    )
}
export default CreateOrder;