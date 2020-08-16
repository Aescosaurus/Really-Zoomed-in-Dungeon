class Menu
{
	constructor( player )
	{
		this.open = true
		
		this.titleSpr = new Sprite( "Images/Title" )
		this.playerSprs =
		[
			new Sprite( "Images/PlayerKnight" ),
			new Sprite( "Images/PlayerMage" ),
			new Sprite( "Images/PlayerRogue" )
		]
		this.selectedSprs =
		[
			new Sprite( "Images/PlayerKnightSelected" ),
			new Sprite( "Images/PlayerMageSelected" ),
			new Sprite( "Images/PlayerRogueSelected" )
		]
		this.startButton = new Button( 16,40,new Sprite( "Images/StartButton" ),new Sprite( "Images/StartButtonLit" ) )
		
		this.selected = -1
		this.mouseX = -1
		this.mouseY = -1
		this.canSelect = false
		this.canClick = false
		
		this.player = player
		
		this.started = false
		
		this.menuMusic = new Sound( "Music/Menu" )
	}
	
	Update( kbd,mouse,inv,heartBar )
	{
		if( !this.open ) return
		
		if( !this.started )
		{
			if( this.startButton.Update( mouse ) )
			{
				this.started = true
				this.menuMusic.Loop()
			}
			return
		}
		
		if( this.mouseX < 0 ) this.mouseX = mouse.x
		if( this.mouseY < 0 ) this.mouseY = mouse.y
		
		for( let i = 0; i < this.playerSprs.length; ++i )
		{
			if( this.mouseX != mouse.x || this.mouseY != mouse.y )
			{
				if( this.playerSprs[i].Contains(
					2 + i * ( this.playerSprs[0].width + 2 ) + this.playerSprs[i].width,
					32 + this.playerSprs[i].height,
					mouse.x,mouse.y ) )
				{
					this.selected = i
				}
				else if( this.selected == i ) this.selected = -1
			}
		}
		
		if( kbd.KeyDown( 'A' ) )
		{
			if( this.canSelect )
			{
				--this.selected
				if( this.selected < 0 ) this.selected = 2
			}
			this.canSelect = false
		}
		else if( kbd.KeyDown( 'D' ) )
		{
			if( this.canSelect )
			{
				++this.selected
				if( this.selected > 2 ) this.selected = 0
			}
			this.canSelect = false
		}
		else this.canSelect = true
		
		this.mouseX = mouse.x
		this.mouseY = mouse.y
		
		if( kbd.KeyDown( '1' ) ) this.selected = 0
		else if( kbd.KeyDown( '2' ) ) this.selected = 1
		else if( kbd.KeyDown( '3' ) ) this.selected = 2
		
		if( this.open && this.selected >= 0 && ( kbd.KeyDown( ' ' ) || ( mouse.down && this.canClick ) ) )
		{
			this.open = false
			this.player.myClass = this.selected
			inv.GiveDefaultItem( this.player )
			heartBar.SetDefaultHP( this.player )
		}
		
		this.canClick = !mouse.down
	}
	
	Draw( gfx )
	{
		if( this.open )
		{
			gfx.DrawSprite( 0,0,this.titleSpr )
			
			if( !this.started )
			{
				this.startButton.Draw( gfx )
				return
			}
			
			for( let i = 0; i < this.playerSprs.length; ++i )
			{
				let spr = this.playerSprs[i]
				if( i == this.selected ) spr = this.selectedSprs[i]
				gfx.DrawSprite( 2 + i * ( this.playerSprs[0].width + 2 ),32,
					spr )
			}
		}
	}
	
	IsOpen()
	{
		return( this.open )
	}
}