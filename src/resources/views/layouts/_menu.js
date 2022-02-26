<ul class="sidebar-navigation">
      <li class="header">Geral</li>
      <li class="active">
        <a href="#">
          <i class="fas fa-th-large"></i> Dashboard
        </a>
      </li>
      <% if(session.permissions.some((permission) => ["login_admin"].indexOf(permission) >= 0)){ %>
        <li>
          <a href="#">
            <i class="fas fa-users"></i> Usuários
          </a>
        </li>
      <% } %>
      <% if(session.permissions.some((permission) => ["view_teams"].indexOf(permission) >= 0)){ %>
        <li>
          <a href="#">
            <i class="fas fa-flag"></i> Times
          </a>
        </li>
      <% } %>
      <li class="header">Contéudo</li>
      <% if(session.permissions.some((permission) => ["view_alerts"].indexOf(permission) >= 0)){ %>
        <li>
          <a href="#">
            <i class="fa fa-users" aria-hidden="true"></i> Alertas
          </a>
        </li>
      <% } %>
      <li class="header">Administração</li>
      <% if(session.permissions.some((permission) => ["view_permissions"].indexOf(permission) >= 0)){ %>
        <li>
          <a href="#">
            <i class="fas fa-user-friends"></i> Grupo de Permissões
          </a>
        </li>
      <% } %>
    </ul>