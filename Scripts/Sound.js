class Sound
{
	constructor( src,vol = 0.3 )
	{
		this.sound = new Audio( src + ".wav" )
		this.sound.volume = vol
	}
	
	Play()
	{
		this.sound.currentTime = 0
		this.sound.play()
	}
	
	Loop()
	{
		this.sound.volume = 1.0
		this.sound.loop = true
		this.sound.play()
	}
	
	Stop()
	{
		this.sound.pause()
		this.sound.currentTime = 0
	}
	
	SetVolume( vol )
	{
		this.sound.volume = vol
	}
	
	IsPlaying()
	{
		return( !this.sound.paused )
	}
}