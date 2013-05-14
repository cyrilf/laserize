# Laserize

It's a jQuery plugin.

Laserize allow you to transform two images into a shinny laser hover effect.

## Examples

Here is some [live examples](http://cyrilf.github.com/laserize).

## Basic use

    $('.laserZone').laserize();

## Advanced use

    $('.laserzone').laserize({
        //Css or just color of the laser
        //laser : {'border-radius':'50%', 'box-shadow':'0 0 23px 7px red', 'background':'red'},
        laser : '#82f167',
        orientation :'horizontal' //orientation of the laser
        onlyOnce : false,         //Do the animation only one time
        speed : '1.50s',          //Speed of the animation
        callback : function() { console.log('ok'); },  //callback when animation is done
        limitCallback : '75%'     //limit from which the callback can be called
    });


If you have some problems or improvements with it, contact me.

### May the force be with you.

[Cyril F - Web developer](http://cyrilf.com)
