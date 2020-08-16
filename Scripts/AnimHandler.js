class AnimHandler
{
	constructor()
	{
		this.anims =
		[
			new Anim( "Images/AnimAttack",4,5 )
		]
	}
	
	Update()
	{
		for( let i in this.anims )
		{
			if( this.anims[i].active )
			{
				this.anims[i].Update()
			}
		}
		
		for( let i = 0; i < this.anims.length; ++i )
		{
			if( this.anims[i].done )
			{
				this.anims[i].Reset()
				this.anims[i].active = false
				i = 0
			}
		}
	}
	
	Draw( gfx )
	{
		for( let i in this.anims )
		{
			if( this.anims[i].active )
			{
				this.anims[i].Draw( this.anims[i].x,this.anims[i].y,gfx )
			}
		}
	}
	
	SpawnAnim( x,y,srcInd )
	{
		this.anims[srcInd].Reset()
		this.anims[srcInd].active = true
		this.anims[srcInd].x = x
		this.anims[srcInd].y = y
	}
}