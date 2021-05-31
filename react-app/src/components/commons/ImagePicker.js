import React from 'react';

function ImagePicker({ setImage }) {
    function readURL(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                if(setImage)
                setImage(e.target.result)
            };

            reader.readAsDataURL(event.target.files[0]);
            event.target.value = "";
        }
    }
    return (
        <div className="imagePicker p-0">
            <input type="file" accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => {
                    readURL(e);
                }}
            />
            <div className="circle">
                <i className="fas fa-plus"></i>
            </div>
        </div>
    )
}
export default ImagePicker;