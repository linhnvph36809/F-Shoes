import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ initialValues, setDescription, height = 300 }: { initialValues?: string; setDescription: any, height?: number }) => {
    const handleDescription = (content: string) => {
        setDescription(content);
    };

    return (
        <Editor
            initialValue={initialValues}
            apiKey="cnnvqtttkicqoys3lbj51dvhwzqpavr3v3jdohfz4dngpa1q"
            init={{
                height: height,
                menubar: 'file edit view insert format tools table help',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
            }}
            onEditorChange={handleDescription}
        />
    );
};

export default EditorComponent;
