class Main
{
	constructor()
	{
		this.gfx = new Graphics()
		this.mouse = new Mouse( this.gfx )
		this.kbd = new Keyboard()
		
		this.tilemap = new Tilemap( this.gfx )
		this.inv = new Inventory()
		this.heartBar = new HeartBar()
		this.player = new Player( this.tilemap,this.inv,this.heartBar )
		
		this.cam = new Camera( this.player,this.gfx,this.tilemap )
		
		this.curLevel = 0
		this.GenerateLevel()
		
		this.turn = 0
		this.turnDT = 0
		this.minDT = 60 / 4
		
		this.itemDropChance = 30
		this.mageDropChance = 40
		this.rogueDropChance = 5
		
		this.entrance = null
		
		this.menu = new Menu( this.player )
		this.animHand = new AnimHandler()
		
		this.tutSpr = new Sprite( "Images/Tutorial" )
		this.tutorial = true
		this.canExit = false
		
		this.gameOver = false
		this.gameOverSpr = new Sprite( "Images/GameOver" )
		this.gameOverSound = new Sound( "Audio/PlayerDefeat" )
		this.menuButton = new Button( 32 - 19 / 2,24 - 9 / 2,
			new Sprite( "Images/MenuButton" ),new Sprite( "Images/MenuButtonLit" ) )
		
		this.winSpr = new Sprite( "Images/GameWin" )
		this.gameWin = false
		
		this.musics =
		[
			new Sound( "Music/Level" ),
			new Sound( "Music/BossIntro" ),
			new Sound( "Music/BossLoop" ),
		]
	}
	
	Update()
	{
		this.menu.Update( this.kbd,this.mouse,this.inv,this.heartBar )
		if( this.menu.IsOpen() ) return
		
		if( this.tutorial )
		{
			if( !this.kbd.KeyDown( ' ' ) ) this.canExit = true
			
			if( this.kbd.KeyDown( ' ' ) )
			{
				if( this.canExit )
				{
					this.tutorial = false
					this.menu.menuMusic.Stop()
					this.musics[0].Loop()
				}
				
				this.canExit = false
			}
			return
		}
		
		if( this.gameOver || this.gameWin )
		{
			if( this.menuButton.Update( this.mouse ) )
			{
				this.tutorial = true
				this.menu.open = true
				this.menu.started = false
				this.menu.selected = -1
				this.menu.canSelect = false
				this.menu.mouseX = -1
				this.menu.mouseY = -1
				this.menu.canClick = false
				this.gameOver = false
				this.gameWin = false
				this.curLevel = 0
				this.inv.items = []
				this.GenerateLevel()
			}
			return
		}
		
		++this.turnDT
		if( this.turn < 1 && this.turnDT > this.minDT )
		{
			if( this.heartBar.heartCount < 1 )
			{
				this.gameOver = true
				this.gameOverSound.Play()
				return
			}
			
			if( this.player.Update( this.kbd,this.monsters,this.pickups,this.animHand ) )
			{
				this.turnDT = 0
				
				if( this.player.myClass == 2 )
				{
					this.turn += 0.3
					if( this.turn >= 0.5 ) this.turn = 1
				}
				else this.turn = 1
				
				if( this.entrance &&
					this.player.x == this.entrance.x &&
					this.player.y == this.entrance.y )
				{
					this.GenerateLevel()
				}
			}
			
			for( let i = 0; i < this.monsters.length; ++i )
			{
				if( this.monsters[i].hp <= 0 )
				{
					const curMonster = this.monsters[i]
					if( this.monsters.length < 2 )
					{
						this.entrance = new Entrance( curMonster.x,curMonster.y )
					}
					let dropSuccess = Random.Range( 0,100 ) < this.itemDropChance
					if( this.player.myClass == 1 ) dropSuccess = Random.Range( 0,100 ) < this.mageDropChance
					if( this.player.myClass == 2 ) dropSuccess = Random.Range( 0,100 ) < this.rogueDropChance
					if( dropSuccess || curMonster.boss )
					{
						this.pickups.push( new Pickup( this.tilemap,-1 ) )
						const curPickup = this.pickups[this.pickups.length - 1]
						curPickup.item = curMonster.GenerateItem( this.player,this.curLevel - 1 )
						curPickup.x = curMonster.x
						curPickup.y = curMonster.y
					}
					this.monsters.splice( i,1 )
					Monster.defeatSound.Play()
					break
				}
			}
		}
		else if( this.turn >= 1 && this.monsters.length > 0 )
		{
			if( this.monsters[this.turn - 1].Update( this.player,this.monsters ) ) ++this.turn
			
			if( this.turn - 1 >= this.monsters.length ) this.turn = 0
		}
		else if( this.turn % 1 == 0 )
		{
			this.turn = 0
		}
		
		this.animHand.Update()
	}
	
	Draw()
	{
		this.menu.Draw( this.gfx )
		if( this.menu.IsOpen() ) return
		
		if( this.tutorial )
		{
			this.gfx.DrawSprite( 0,0,this.tutSpr )
			return
		}
		
		this.tilemap.Draw( this.player,this.gfx )
		this.tilemap.DrawTilemap( this.gfx )
		
		for( let i in this.pickups )
		{
			this.pickups[i].Draw( this.cam )
		}
		
		for( let i in this.monsters )
		{
			this.monsters[i].Draw( this.cam )
		}
		
		if( this.entrance ) this.entrance.Draw( this.cam )
		
		this.player.Draw( this.cam )
		
		this.heartBar.Draw( this.gfx )
		
		this.inv.Draw( this.gfx )
		
		this.animHand.Draw( this.gfx )
		
		if( this.gameOver )  this.gfx.DrawSprite( 0,0,this.gameOverSpr )
		if( this.gameWin ) this.gfx.DrawSprite( 0,0,this.winSpr )
		if( this.gameOver || this.gameWin ) this.menuButton.Draw( this.gfx )
	}
	
	GenerateLevel()
	{
		for( let i in this.musics ) this.musics[i].Stop()
		
		if( this.curLevel > 2 )
		{
			this.gameWin = true
			return
		}
		
		if( this.curLevel > 0 ) this.musics[this.curLevel].Loop()
		
		this.tilemap.Generate()
		
		this.player.x = this.tilemap.playerPos.x
		this.player.y = this.tilemap.playerPos.y
		
		this.monsters = []
		let monster = null
		for( let i = 0; i < 15; ++i )
		{
			if( this.curLevel == 0 ) monster = new Spider( this.tilemap )
			else if( this.curLevel == 1 ) monster = new Bug( this.tilemap )
			else if( this.curLevel == 2 ) monster = new Fighter( this.tilemap )
			this.monsters.push( monster )
		}
		let boss = null
		if( this.curLevel == 0 ) boss = new Boss( this.tilemap )
		else if( this.curLevel == 1 ) boss = new BossBig( this.tilemap )
		else if( this.curLevel == 2 ) boss = new BossFinal( this.tilemap )
		this.monsters.push( boss )
		
		// this.player.x = this.monsters[this.monsters.length - 1].x
		// this.player.y = this.monsters[this.monsters.length - 1].y
		
		this.pickups = []
		for( let i = 0; i < 4; ++i )
		{
			this.pickups.push( new Pickup( this.tilemap,-1,this.curLevel ) )
		}
		
		this.entrance = null
		
		++this.curLevel
		
		this.turn = 0
	}
}

const main = new Main()

setInterval( function()
{
	main.gfx.DrawRect( 0,0,main.gfx.scrWidth,main.gfx.scrHeight,"#A1858D" )
	main.Update()
	main.Draw()
},1000 / 60.0 )