class Inventory
{
	constructor()
	{
		this.items = []
		this.maxItems = 8
		this.itemSize = 8
		
		this.slotSpr = new Sprite( "Images/ItemSlot" )
		this.numSprs = []
		for( let i = 0; i < this.maxItems; ++i )
		{
			this.numSprs.push( new Sprite( "Images/N" + ( i + 1 ) ) )
		}
		
		// for( let i = 0; i < 1; ++i )
		// {
		// 	this.items.push( new Item( 0,1,3,new Sprite( "Images/Sword" ) ) )
		// }
	}
	
	GiveDefaultItem( player )
	{
		if( player.myClass == 0 )
		{
			this.items.push( new Item( 0,1,3,new Sprite( "Images/Sword0" ) ) )
		}
		else if( player.myClass == 1 )
		{
			this.items.push( new Item( 0,0.9,3,new Sprite( "Images/Staff0" ) ) )
			this.items.push( new Item( 2,1,1,new Sprite( "Images/Fruit" ) ) )
			this.items.push( new Item( 2,1,1,new Sprite( "Images/Fruit" ) ) )
			this.items.push( new Item( 2,1,1,new Sprite( "Images/Fruit" ) ) )
		}
		else
		{
			this.items.push( new Item( 0,0.35,3,new Sprite( "Images/Dagger0" ) ) )
		}
	}
	
	Draw( gfx )
	{
		for( let i = 0; i < this.maxItems; ++i )
		{
			// gfx.DrawRect( i * this.itemSize,48,
			// 	this.itemSize,this.itemSize,"red" )
			
			gfx.DrawSprite( i * this.itemSize,48,
				this.slotSpr )
			
			if( this.items[i] != undefined )
			{
				this.items[i].Draw( i * this.itemSize,48,gfx )
			}
			
			gfx.DrawSprite( i * this.itemSize + 5,48 + 5,
				this.numSprs[i] )
		}
	}
	
	GetItem( slot )
	{
		if( this.items[slot] )
		{
			return( this.items[slot] )
		}
		else
		{
			return( null )
		}
	}
	
	AddItem( item )
	{
		if( item.type == 0 )
		{
			this.items[0] = item
			return( true )
		}
		
		for( let i = 0; i < this.maxItems; ++i )
		{
			if( !this.items[i] )
			{
				this.items[i] = item
				return( true )
				break
			}
		}
		
		return( false )
	}
}