class HeartBar
{
	constructor()
	{
		this.maxHearts = 3
		this.heartCount = this.maxHearts
		
		this.maxArmor = 5
		this.armorCount = 0
		
		this.heartFullSpr = new Sprite( "Images/HeartFull" )
		this.heartEmptySpr = new Sprite( "Images/HeartEmpty" )
		this.armorSpr = new Sprite( "Images/Armor" )
	}
	
	Draw( gfx )
	{
		for( let i = 0; i < this.maxHearts; ++i )
		{
			gfx.DrawSprite( 8 * i,64 - 8,
				i >= this.heartCount ? this.heartEmptySpr : this.heartFullSpr )
		}
		
		for( let i = 0; i < this.armorCount; ++i )
		{
			gfx.DrawSprite( 8 * this.maxHearts + i * 8,64 - 8,
				this.armorSpr )
		}
	}
	
	Attack( dmg )
	{
		for( let i = 0; i < dmg; ++i )
		{
			if( this.armorCount > 0 ) --this.armorCount
			else --this.heartCount
		}
	}
	
	AddHP( amount )
	{
		this.heartCount += amount
		if( this.heartCount > this.maxHearts )
		{
			this.heartCount = this.maxHearts
			return( false )
		}
		return( true )
	}
	
	AddArmor( amount )
	{
		this.armorCount += amount
		if( this.armorCount > this.maxArmor )
		{
			this.armorCount = this.maxArmor
			return( false )
		}
		return( true )
	}
	
	SetDefaultHP( player )
	{
		if( player.myClass == 0 )
		{
			this.maxHearts = 3
			this.armorCount = 1
		}
		else if( player.myClass == 1 )
		{
			this.maxHearts = 5
		}
		else if( player.myClass == 2 )
		{
			this.maxHearts = 2
		}
		
		this.heartCount = this.maxHearts
		this.maxArmor = 8 - this.maxHearts
	}
}