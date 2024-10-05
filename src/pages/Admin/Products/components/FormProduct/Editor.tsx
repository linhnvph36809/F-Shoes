import { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = memo(({ initialValues, setDescription }: { initialValues?: string; setDescription: any }) => {
    const handleDescription = (content: string) => {
        setDescription(content);
    };

    return (
        <Editor
            initialValue={initialValues}
            apiKey="cnnvqtttkicqoys3lbj51dvhwzqpavr3v3jdohfz4dngpa1q"
            init={{
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleDescription}
        />
    );
});

export default EditorComponent;
