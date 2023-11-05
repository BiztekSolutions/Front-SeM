function VideoEmbed({youtubeLink}) {
    

    function getYoutubeId() {
        
        let youtubeId = youtubeLink.split('v=')[1];
        const endIndex = youtubeId.indexOf('&');
        if(endIndex !== -1) {
            youtubeId = youtubeId.slice(0, endIndex);
        }
        return youtubeId
    }


    return (
        <div className="d-flex justify-content-center">
            <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId()}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            />
        </div>
    )

}

export default VideoEmbed