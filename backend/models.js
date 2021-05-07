import { title } from "node:process";

export const boardInfo = (id, title, color) => ({
    id: id,
    title: title,
    color: color,
});

export const board = (id, title, color, labels, stacks) => ({
    id: id,
    title: title,
    labels: labels,
    color: color,
    stacks: stacks,

});

export const label = (id, title, color) => ({
    id: id,
    title: title,
    color: color,
});

export const stack = (id, title, cards) => ({
    id: id,
    title: title,
    cards: cards,
});

export const card = (id, title, description, labels, usernames, duedate) => ({
    id: id,
    title: title,
    description: description,
    labels: labels,
    usernames: usernames,
    duedate: duedate,
});