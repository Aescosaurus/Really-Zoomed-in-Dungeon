class SoundEffect
{
	constructor( name,count,vol = 1.0 )
	{
		this.sounds = []
		
		for( let i = 0; i < count; ++i )
		{
			this.sounds.push( new Sound( name + i,vol ) )
		}
	}
	
	Play()
	{
		this.sounds[Random.Range( 0,this.sounds.length - 1 )].Play()
	}
}