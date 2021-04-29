class PlayerActivator
{
	constructor()
	{
		this._videoPlayer = document.querySelector( '.plyr .plyr__video-wrapper video' );
		this._playButton  = document.querySelector( '.plyr .plyr__controls .plyr__controls__item[data-plyr="play"]' );
	}

	_play()
	{
		this._playButton.click();
	}

	activate()
	{
		this._play();
	}
}
