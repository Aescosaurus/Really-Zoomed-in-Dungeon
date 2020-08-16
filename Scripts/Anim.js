class Anim
{
	constructor( name,frameCount,delay )
	{
		this.frames = []
		for( let i = 0; i < frameCount; ++i )
		{
			this.frames.push( new Sprite( name + i ) )
		}
		this.delay = delay
		this.time = 0
		this.curFrame = 0
		this.done = false
		this.active = false
	}
	
	Update()
	{
		if( ++this.time > this.delay )
		{
			this.time = 0
			if( ++this.curFrame >= this.frames.length )
			{
				this.curFrame = 0
				this.done = true
			}
		}
	}
	
	Draw( x,y,gfx )
	{
		gfx.DrawSprite( x,y,this.frames[this.curFrame] )
	}
	
	Reset()
	{
		this.time = 0
		this.curFrame = 0
		this.done = false
	}
}