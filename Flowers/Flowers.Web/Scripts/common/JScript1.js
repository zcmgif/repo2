
$.extend($.fn.treegrid.defaults, {
    onLoadSuccess: function () {
        var target = $(this);
        var opts = $.data(this, "treegrid").options;
        var panel = $(this).datagrid("getPanel");
        var gridBody = panel.find("div.datagrid-body");
        var idField = opts.idField; //这里的idField其实就是API里方法的id参数
        gridBody.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").click(function (e) {
            if (opts.singleSelect) return; //单选不管
            if (opts.cascadeCheck || opts.deepCascadeCheck) {
                var id = $(this).parent().parent().parent().attr("node-id");
                var status = false;
                if ($(this).attr("checked")) status = true;
                //级联选择父节点
                selectParent(target, id, idField, status);
                selectChildren(target, id, idField, opts.deepCascadeCheck, status);

                function selectParent(target, id, idField, status) {
                    var parent = target.treegrid('getParent', id);
                    if (parent) {
                        var parentId = parent[idField];
                        if (status)
                            target.treegrid('select', parentId);
                        else
                            target.treegrid('unselect', parentId);
                        selectParent(target, parentId, idField, status);
                    }
                }

                function selectChildren(target, id, idField, deepCascade, status) {
                    //深度级联时先展开节点
                    if (status && deepCascade)
                        target.treegrid('expand', id);
                    //根据ID获取下层孩子节点
                    var children = target.treegrid('getChildren', id);
                    for (var i = 0; i < children.length; i++) {
                        var childId = children[i][idField];
                        if (status)
                            target.treegrid('select', childId);
                        else
                            target.treegrid('unselect', childId);
                        selectChildren(target, childId, idField, deepCascade, status); //递归选择子节点
                    }
                }
            }
            e.stopPropagation(); //停止事件传播
        });
    }
});