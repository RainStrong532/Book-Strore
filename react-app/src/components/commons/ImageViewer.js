import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

function ImageViewerCustom({images}) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div className="px-5">
            <div className="row p-4">
                {
                    (!images || images.length === 0)
                        ?
                        <div className="no-image ml-3 col-3 d-flex justify-content-center align-items-center pl-0"
                        style={{ height: "200px", background: "#d5d5d5" }}
                        >
                            <p className="m-0" style={{color: "#666", fontWeight: "bold", cursor: "context-menu"}}>Chưa có ảnh nào</p>
                        </div>
                        :
                        <div className="col-3 d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', border: "1px solid #e5e5e5" }}>
                            <img
                                src={images[0]}
                                onClick={() => openImageViewer(0)}
                                style={{
                                    width: "100%", height: "auto", margin: '2px', cursor: "pointer"
                                }}
                                height="200"
                                key={0}
                                alt="Ảnh" />
                        </div>
                }

                {
                    (images.length > 1) ?
                        <div className="ml-3 more-image col-3 d-flex justify-content-center align-items-center"
                        style={{ height: "200px", background: "#d5d5d5", cursor: "pointer" }}
                        onClick={() => openImageViewer(1)}
                        >
                            <p style={{fontSize: "5rem", fontWeight: "bold"}}>+{images.length - 1}</p>
                        </div>
                        :
                        <></>
                }
            </div>
            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                />
            )}
        </div>
    );
}

export default ImageViewerCustom;