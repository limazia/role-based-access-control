const connection = require("../../database/connection");
const moment = require("moment");
const MarkdownIt = require("markdown-it");

moment.locale("pt-br");

class WebController {
  async renderHome(request, response, next) {
    try {
      const md = new MarkdownIt();

      const users = await connection("team")
        .leftJoin("users", "users.id", "=", "team.user_id")
        .leftJoin("users_details", "users_details.user_id", "=", "users.id")
        .orderBy("team.createdAt", "asc");
      
      const changelogs = await connection("changelogs").orderBy("createdAt", "desc").limit(1);
      const bots = await connection("bots");

      const serializedTeams = users.map((item) => {
        const { id, username, discriminator, avatar, premium_type, user_role } = item;

        return {
          id,
          username,
          discriminator,
          avatar,
          premium_type,
          user_role
        };
      });

      const serializedChangelogs = changelogs.map((item) => {
        const { changelog_title, changelog_content, createdAt } = item;
        const result = md.render(changelog_content);

        return {
          changelog_title,
          changelog_content: result,
          createdAt: moment(createdAt).format("LL")
        };
      });

      const serializedBots = bots.map((item) => {
        const {
          bot_name,
          bot_description,
          bot_avatar,
          bot_changelog,
          updateAt,
          createdAt,
        } = item;
        const result = md.render(bot_changelog);

        return {
          bot_name,
          bot_description,
          bot_avatar,
          bot_changelog: result,
          updateAt: moment(updateAt).format("L"),
          createdAt: moment(createdAt).format("L")
        };
      });
 
      return response.status(200).render("Home", {
        session: request.session.user || null,
        teams: serializedTeams || null,
        changelogs: serializedChangelogs || null,
        bots: serializedBots || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderStore(request, response, next) {
    try {
      return response.status(200).render("Store", {
        title: "Loja",
        menuActive: "store",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderSupport(request, response, next) {
    try {
      return response.status(200).render("Support", {
        title: "Suporte",
        menuActive: "support",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderCommands(request, response, next) {
    try {
      return response.status(200).render("Commands", {
        title: "Comandos",
        menuActive: "commands",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderGuilds(request, response, next) {
    try {
      return response.status(200).render("Guilds", {
        title: "Servidores",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderProfile(request, response, next) {
    try {
      const { username, discriminator } = request.params;

      return response.status(200).render("Profile", {
        title: `Perfil de ${username}#${discriminator}`,
        username,
        discriminator,
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPurchases(request, response, next) {
    try {
      return response.status(200).render("Purchases", {
        title: "Compras",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderSettings(request, response, next) {
    try {
      return response.status(200).render("Settings", {
        title: "Configurações",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderChangelogs(request, response, next) {
    try {
      const md = new MarkdownIt();
      const changelogs = await connection("changelogs").orderBy("createdAt", "desc");

      const serializedChangelogs = changelogs.map((item) => {
        const { changelog_title, changelog_content, createdAt } = item;
        const result = md.render(changelog_content);

        return {
          changelog_title,
          changelog_content: result,
          createdAt: moment(createdAt).format("LL")
        };
      });
 
      return response.status(200).render("Changelogs", {
        title: "Changelogs",
        menuActive: "changelogs",
        session: request.session.user || null,
        changelogs: serializedChangelogs || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderTerms(request, response, next) {
    try {
      return response.status(200).render("Terms", {
        title: "Termos"
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPrivacyPolicy(request, response, next) {
    try {
      return response.status(200).render("Privacy-Policy", {
        title: "Política de Privacidade"
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPageNotFound(request, response, next) {
    try {
      return response.status(404).redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebController();