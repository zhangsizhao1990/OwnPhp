Ext.onReady(function(){

  var myData = [
    ['1', 'fa-camera-retro fa-5x'],
    ['2', 'fa-camera-retro fa-5x'],
    ['3', 'fa-camera-retro fa-5x'],
    ['4', 'fa-camera-retro fa-5x'],
    ['5', 'fa-camera-retro fa-5x'],
    ['6', 'fa-camera-retro fa-5x'],
    ['7', 'fa-camera-retro fa-5x'],
    ['8', 'fa-camera-retro fa-5x'],
    ['9', 'fa-camera-retro fa-5x'],
    ['10', 'fa-camera-retro fa-5x'],
  ];

  var store = new Ext.data.Store({
    fields: [
      {name: 'name'},
      {name: 'url'}
    ]
  });

  store.loadData(myData);

  var tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<div class="thumb"><i class="fa {url}"></i></div>',
        '<span class="x-editable">{shortName}</span></div>',
      '</tpl>',
      '<div class="x-clear"></div>'
  );

  var panel = new Ext.Panel({
    id:'images-view',
    frame:false,
    width:535,
    height:"100%",
    collapsible:true,
    layout:'fit',
    title:'Simple DataView  ',

    items: new Ext.DataView({
      store: store,
      tpl: tpl,
      autoHeight:true,
      multiSelect: true,
      overClass:'x-view-over',//鼠标悬停item时的类样式,defaults to undefined
      itemSelector:'div.thumb-wrap',//必须项,值为item选择器,此值也可为.thumb-wrap  e.g. div.some-class
      emptyText: 'No images to display',

      plugins: [
        new Ext.DataView.DragSelector(),//拖拽选择
        /*new Ext.DataView.LabelEditor({dataIndex: 'name'})//可对名称编辑*/
      ],

      prepareData: function(data){//数据预处理,即数据处理前.data为原始数据,类型为对象.
        data.shortName = Ext.util.Format.ellipsis(data.name, 15);
        //data.sizeString = Ext.util.Format.fileSize(data.size);
        //data.dateString = data.lastmod.format("n/j h:ia");
        return data;
      },

      listeners: {
        selectionchange: {//结点的选择发生改变时,即重新选择结点时,可以更改为selectionchange:function(dv,nodes)...
          fn: function(dv,nodes){
            var l = nodes.length;
            var s = l != 1 ? 's' : '';
            panel.setTitle('Simple DataView ('+l+' item'+s+' selected)');
          }
        }
      }
    })
  });
  panel.render(document.body);

});
