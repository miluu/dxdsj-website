<div class="item <% if (importance > 1) { %>imp<% } %>" <% if (importance === 3) { %>style="font-weight: bold;"<% } %>
  data-created-at="<%= createdAt %>"
>
  <div class="col-icon">
    <a href="/livenews-detail?id=<%= _id %>" title="查看详情" target="_blank">
      <span class="icon icon-news<% if (importance > 1) { %>-red<% } %>"></span>
    </a>
  </div>
  <div class="col-time">
    <span class="time j-unixtime" data-unix="<%= createdAt %>"
      title="<%= moment.unix(createdAt).format('YYYY-MM-DD HH:mm:ss') %>"
    >
      <%= moment.unix(createdAt).format('HH:mm') %>
    </span>
  </div>
  <% if (imageUrls.length === 0) { %>
  <div class="col-summary">
    <div class="summary">
      <%= contentHtml %>
    </div>
  </div>
  <% } else { %>
  <div class="col-img-summary">
    <div class="summary">
      <%= contentHtml %>
    </div>
  </div>
  <div class="col-img">
    <a href="/livenews-detail?id=<%= _id %>" target="_blank">
      <img src="/static/theme/default/img/newspics/<%= imageUrls[0] %>">
    </a>
  </div>
  <% } %>
</div>
